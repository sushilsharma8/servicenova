import EventForm from "@/components/EventForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white py-12 mb-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Event Staff</h1>
          <p className="text-xl opacity-90">
            Connect with professional bartenders, servers, and chefs for your next event
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4">
        <EventForm />
      </main>
    </div>
  );
};

export default Index;