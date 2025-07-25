import { useEffect, useRef, useState } from "react";
import Input from "./InputField";
import { Building, Map, MapPin, Navigation, Plane, X } from "lucide-react";
import IconButton from "./IconButton";

declare global {
  interface Window {
    google: any;
  }
}

const getIconForType = (types: string[]) => {
  if (types.includes("airport"))
    return <Plane className="w-4 h-4 text-blue-600" />;
  if (types.includes("establishment") || types.includes("business"))
    return <Building className="w-4 h-4 text-green-600" />;
  if (types.includes("route") || types.includes("street_address"))
    return <Navigation className="w-4 h-4 text-purple-600" />;
  return <MapPin className="w-4 h-4 text-gray-500" />;
};

interface PlaceData {
  displayName: string;
  formattedAddress: string;
  id: string;
}

interface IAutoCompleteProps {
  label?: string;
  placeholder?: string;
  initialValue: string;
  onChange: (val: PlaceData) => void;
}

export const PlacesAutoCompleteWidget = ({
  label,
  placeholder,
  initialValue,
  onChange,
}: IAutoCompleteProps) => {
  const [input, setInput] = useState(initialValue || "");
  const [selectedPlace, setSelectedPlace] = useState<PlaceData | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const libraryRef = useRef<any>(null);
  const sessionTokenRef = useRef<any>(null);
  const debounceTimerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load library & session token once
  useEffect(() => {
    (async () => {
      const lib = (await window.google.maps.importLibrary(
        "places"
      )) as google.maps.PlacesLibrary;
      libraryRef.current = lib;
      sessionTokenRef.current = new lib.AutocompleteSessionToken();
    })();
  }, []);

  // Click outside to close suggestions
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        resetSearch();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setInput(initialValue || "");
    if (!initialValue) {
      setSuggestions([]);
      setSelectedPlace(null);
    }
  }, [initialValue]);

  // Debounced input watcher
  useEffect(() => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      if (!selectedPlace && initialValue !== input) fetchSuggestions(input);
    }, 300);

    return () => clearTimeout(debounceTimerRef.current);
  }, [input]);

  const fetchSuggestions = async (query: string) => {
    if (!libraryRef.current) return;
    setLoading(true);
    try {
      const { AutocompleteSuggestion } = libraryRef.current;
      const { suggestions } =
        await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: query,
          language: "en-US",
          region: "us",
          sessionToken: sessionTokenRef.current,
        });
      setSuggestions(suggestions || []);
    } catch (err) {
      console.error("Suggestion fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (suggestion: any) => {
    setLoading(true);
    try {
      const place = suggestion.placePrediction.toPlace();

      await place.fetchFields({
        fields: ["displayName", "formattedAddress", "id"],
      });

      const placeData: PlaceData = {
        displayName: place.displayName || "Unknown",
        formattedAddress: place.formattedAddress || "",
        id: place.id || "",
      };
      onChange(placeData);
      setInput(placeData.displayName); // sync local display

      setSelectedPlace(placeData);
      setSuggestions([]);
      // New token for next search
      sessionTokenRef.current =
        new libraryRef.current.AutocompleteSessionToken();
    } catch (err) {
      console.error("Place selection failed", err);
      setError("Failed to select place. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setSuggestions([]);
  };

  const handleClear = () => {
    setInput("");
    onChange({
      displayName: "",
      formattedAddress: "",
      id: "",
    }); // Optional: clear form state
    setSelectedPlace(null);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <Input
          rightIcon={<MapPin size={18} />}
          label={label}
          type="text"
          loading={loading}
          placeholder={placeholder}
          value={input}
          onFocus={() => setSuggestions(suggestions)} // re-show on focus
          onChange={(e) => {
            setError(null);
            setInput(e.target.value);
          }}
        />
        {selectedPlace && !loading && (
          <IconButton
            className="absolute !p-1 right-3 top-12 transform -translate-y-1/2 hover:bg-gray-100 !rounded-full"
            onClick={handleClear}
            icon={<X size={16} />}
          />
        )}
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border-b border-red-100 rounded mt-1">
          {error}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border-gray-200 rounded-lg shadow-lg max-h-64 overflow-auto">
          {suggestions.map((s, i) => {
            const types = s.placePrediction.types || [];
            const primary = s.placePrediction.text?.toString();
            const secondary =
              s.placePrediction?.structuredFormat?.secondaryText?.toString();

            return (
              <div
                key={i}
                onClick={() => handleSelect(s)}
                className="flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-50 border-b border-b-gray-200 last:border-none"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getIconForType(types)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm text-gray-900 truncate">
                    {primary}
                  </div>
                  {secondary && (
                    <div className="text-xs text-gray-500 mt-0.5 truncate">
                      {secondary}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
