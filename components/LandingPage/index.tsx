import LandingFeatures from "./LandingFeatures";
import LandingHero from "./LandingHero";
import LandingNavbar from "./LandingNavbar";

const LandingPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="min-h-screen flex flex-col select-none">
      {/* Landing Page Navbar */}
      <LandingNavbar />

      {/* Landing Page Hero */}
      <LandingHero />

      {/* Landing Page Features */}
      <LandingFeatures />

      {/* Landing Page Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Copyright */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Meetora. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default LandingPage;
