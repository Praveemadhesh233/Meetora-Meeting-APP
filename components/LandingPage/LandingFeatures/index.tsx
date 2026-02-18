import { Card, CardContent } from "@/components/ui/card";
import { landingFeatures } from "@/constants";

const LandingFeatures = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#262626]">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Everything you need for
            <span className="bg-gradient-to-r from-[var(--landing-primary)] to-[var(--landing-accent)] bg-clip-text text-transparent">
              {" "}
              powerful meetings
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Built with advanced features to make your virtual meetings as
            productive as in-person ones
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {landingFeatures?.map((feature, index) => (
            <Card
              key={index}
              className="group bg-[#1e1e1e] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 border-border/50"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--landing-primary)] to-[var(--landing-accent)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
