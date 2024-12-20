import { ScrollArea } from "@/components/ui/scroll-area";

export default function Privacy() {
  return (
    <ScrollArea>
      <div className="px-6 py-4 text-white max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">Last updated: December 20, 2024</p>
        <p className="mb-4">
          This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
        </p>
        <p className="mb-4">
          We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Interpretation and Definitions</h2>
        <h3 className="text-xl font-semibold mt-4 mb-2">Interpretation</h3>
        <p className="mb-4">
          The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or plural.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Definitions</h3>
        <p className="mb-4">For the purposes of this Privacy Policy:</p>
        <ul className="list-disc pl-8 mb-4 space-y-2">
          <li><strong>Account:</strong> A unique account created for You to access our Service or parts of our Service.</li>
          <li><strong>Affiliate:</strong> An entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for election of directors or other managing authority.</li>
          <li><strong>Company:</strong> (referred to as either "the Company", "We", "Us", or "Our" in this Agreement) refers to ServiceNova.</li>
          <li><strong>Cookies:</strong> Small files placed on Your device by a website, containing browsing history and other data.</li>
          <li><strong>Country:</strong> Refers to: Karnataka, India.</li>
          <li><strong>Device:</strong> Any device that can access the Service, such as a computer, cellphone, or digital tablet.</li>
          <li><strong>Personal Data:</strong> Information relating to an identifiable individual.</li>
          <li><strong>Service:</strong> Refers to the Website.</li>
        </ul>
        {/* Add more sections similarly */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
        <p className="mb-4">If you have any questions about this Privacy Policy, You can contact us:</p>
        <ul className="list-disc pl-8">
          <li>By visiting this page on our website: <a href="https://servicenova-six.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://servicenova-six.vercel.app</a></li>
        </ul>
      </div>
    </ScrollArea>
  );
}
