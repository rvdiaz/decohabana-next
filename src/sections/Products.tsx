import { Badge } from "@/components/CodidgeUI/badge";
import { LucideIcon } from "lucide-react";

export type ProductItem = {
  name: string;
  price: string;
  image: string;
};

export type ProductsCategory = {
  category: string;
  icon: LucideIcon;
  items: ProductItem[];
};

export type ProductsProps = {
  products: ProductsCategory[];
};

export default function Products({ products }: ProductsProps) {
  // se agrega para filtrar los productos que no tienen categoria
  const filteredProducts = products.filter(
    (category) => category.items.length > 0
  );
  return (
    <section id="products" className="py-10 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-primary/10 !text-primary hover:bg-primary/20 hover:!text-white px-4 py-2">
            Rental Collection
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Premium Event Rentals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            High-quality furniture, lighting, and decorative items to elevate
            your event
          </p>
        </div>
        <div className="space-y-12">
          {filteredProducts.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#731313] p-3 rounded-full">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.category}
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden "
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-gray-900">
                            {item.name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
