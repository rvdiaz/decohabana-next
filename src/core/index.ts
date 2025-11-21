const tenantId = process.env.TENANTID;
const solutionId = process.env.TENANT_SOLUTION;

export const getQueriesVariables = {
  tenant: {
    tenantId,
    solutionId,
  },
};

export const clientInfo = {
  email: "hello@decohabana.com",
  phoneToCall: "+15551234567",
  phoneToShow: "(555) 123-4567",
  socialNetworks: {
    instagram: "",
  },
  handler: tenantId,
};

// export const menuConfig = [
//   {
//     title: "Home",
//     id: "home",
//     path: "/",
//     mobileOnly: false,
//   },
//   {
//     title: "About",
//     id: "aboutUs",
//   },
//   {
//     title: "Gallery",
//     id: "gallery",
//     path: "/gallery",
//   },
// ];

// export const aboutUs = {
//   label: "About Us",
//   title: "Who is Unique Building Contractors?",
//   description: [
//     "At Unique Building Contractors, we bring craftsmanship, creativity, and quality to every project we undertake. Based in Tampa, Florida, our team is dedicated to transforming your vision into reality—whether you're building from the ground up or reimagining the space you already love.",
//     "With years of experience in the construction industry, we specialize in new construction, home additions, remodeling, and interior renovations, including kitchens, bathrooms, and flooring. We’re passionate about delivering work that’s not only built to last but also tailored to fit your lifestyle and needs.",
//     "What sets us apart is our commitment to personalized service, attention to detail, and a seamless construction experience from start to finish. At Unique Building Contractors, we don’t just build homes—we build lasting relationships with every client.",
//   ],
// };
