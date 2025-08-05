import { ITenant } from "@/interfaces/tenant";
import { getContactConfigByTenant } from "@/lib/actions/contact";
import { Mail, MapPinIcon, Phone } from "lucide-react";
import React from "react";
import { ProccessForm } from "../CodidgeUI/FormProcessor";

export async function ContactPage() {
  const contactFormConfig: {
    getTenant: ITenant;
  } = await getContactConfigByTenant();

  const tenantData = contactFormConfig?.getTenant;

  const contactFormModule =
    tenantData?.solutions &&
    tenantData?.solutions
      .flatMap((solution) => solution.tenantModules)
      .find((module) => module.moduleKey === "contactSubmissions");

  const metaData = contactFormModule
    ? JSON.parse(contactFormModule.metaData)
    : {};

  if (!contactFormModule) {
    return;
  }

  const form1 = metaData.find((form: any) => form.formId === "contact");

  return (
    <div id="contact" className="relative py-20 bg-black">
      <div
        className="absolute z-0 inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/contact.jpg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary-400">
            Contact Us
          </h2>
          <p className="text-xl text-gray-300">
            Get in touch for personalized service and custom quotes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary-400">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-primary-400 mr-4" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-primary-400 mr-4" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-300">info@goldenwheels.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPinIcon className="w-6 h-6 text-primary-400 mr-4" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-300">
                      123 Luxury Lane
                      <br />
                      Beverly Hills, CA 90210
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary-400">
                Business Hours
              </h4>
              <div className="space-y-2 text-gray-300">
                <p>Monday - Friday: 6:00 AM - 12:00 AM</p>
                <p>Saturday - Sunday: 24/7 Service Available</p>
                <p className="text-primary-400 text-sm">
                  Emergency service available 24/7
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-primary-400">
              Send us a Message
            </h3>

            <ProccessForm form={form1} />
          </div>
        </div>
      </div>
    </div>
  );
}
