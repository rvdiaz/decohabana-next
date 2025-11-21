import React from "react";
import { QuoteFormData } from "./quoteForm";

interface QuoteEventNeedsProps {
  formData: QuoteFormData;
  updateFormData: (field: keyof QuoteFormData, value: any) => void;
}

export default function QuoteEventNeeds({
  formData,
  updateFormData,
}: QuoteEventNeedsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Event Equipment Needs
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Let us know what equipment you need for your event. Only specify
          quantities if you need the item.
        </p>
      </div>

      <div className="space-y-6">
        {/* Chairs Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="mb-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="needChairs"
                checked={formData.needChairs}
                onChange={(e) => {
                  updateFormData("needChairs", e.target.checked);
                  if (!e.target.checked) {
                    updateFormData("chairsCount", 0);
                  }
                }}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="needChairs" className="font-medium text-gray-900">
                Chairs
              </label>
            </div>
          </div>

          {formData.needChairs && (
            <div className="ml-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many chairs do you need?
              </label>
              <input
                type="number"
                value={formData.chairsCount || ""}
                onChange={(e) =>
                  updateFormData("chairsCount", parseInt(e.target.value) || 0)
                }
                placeholder={`Enter number of chairs (${formData.peopleCount} guests expected)`}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={formData.needChairs}
              />
            </div>
          )}
        </div>

        {/* Tables Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="mb-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="needTables"
                checked={formData.needTables}
                onChange={(e) => {
                  updateFormData("needTables", e.target.checked);
                  if (!e.target.checked) {
                    updateFormData("tablesCount", 0);
                  }
                }}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="needTables" className="font-medium text-gray-900">
                Tables
              </label>
            </div>
          </div>

          {formData.needTables && (
            <div className="ml-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many tables do you need?
              </label>
              <input
                type="number"
                value={formData.tablesCount || ""}
                onChange={(e) =>
                  updateFormData("tablesCount", parseInt(e.target.value) || 0)
                }
                placeholder="Enter number of tables"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={formData.needTables}
              />
              <p className="mt-1 text-xs text-gray-500">
                Standard round tables typically seat 8-10 people
              </p>
            </div>
          )}
        </div>

        {/* Tents Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="needTents"
                checked={formData.needTents}
                onChange={(e) => {
                  updateFormData("needTents", e.target.checked);
                  if (!e.target.checked) {
                    updateFormData("tentsCount", 0);
                  }
                }}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="needTents" className="font-medium text-gray-900">
                Tents / Canopies
              </label>
            </div>
          </div>

          {formData.needTents && (
            <div className="ml-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many tents do you need?
              </label>
              <input
                type="number"
                value={formData.tentsCount || ""}
                onChange={(e) =>
                  updateFormData("tentsCount", parseInt(e.target.value) || 0)
                }
                placeholder="Enter number of tents"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={formData.needTents}
              />
              <p className="mt-1 text-xs text-gray-500">
                We'll help determine the right size based on your guest count
                and venue
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {(formData.needChairs || formData.needTables || formData.needTents) && (
        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h4 className="font-medium text-blue-900 mb-2">Equipment Summary:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            {formData.needChairs && formData.chairsCount > 0 && (
              <li>• {formData.chairsCount} chairs</li>
            )}
            {formData.needTables && formData.tablesCount > 0 && (
              <li>• {formData.tablesCount} tables</li>
            )}
            {formData.needTents && formData.tentsCount > 0 && (
              <li>• {formData.tentsCount} tents</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
