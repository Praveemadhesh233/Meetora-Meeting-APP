import Image from "next/image";

const LandingHero = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)] -z-10" />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-[var(--landing-primary)]/10 text-[var(--landing-primary)] text-sm font-medium border border-[var(--landing-primary)]/20">
                Connect from anywhere
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Meet, collaborate, and{" "}
              <span className="bg-gradient-to-r from-[var(--landing-primary)] to-[var(--landing-accent)] bg-clip-text text-transparent">
                succeed together
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl">
              Experience crystal-clear video meetings with powerful
              collaboration tools. Connect your team, share ideas, and make
              every meeting count.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)]">
              <Image
                src={"/images/landing-hero-meeting.jpg"}
                alt="Video meeting collaboration"
                width={500}
                height={500}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-[var(--shadow-card)] backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--landing-primary)] to-[var(--landing-accent)] flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">HD</span>
                </div>
                <div>
                  <p className="font-semibold">Crystal Clear Quality</p>
                  <p className="text-sm text-muted-foreground">1080p Video</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
