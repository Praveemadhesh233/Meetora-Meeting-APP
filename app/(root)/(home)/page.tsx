import HomeDateTime from "@/components/components/HomeDateTime";
import MeetingTypeList from "@/components/components/MeetingTypeList";

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-cover bg-[url('/images/hero-background.png')]">
        <HomeDateTime />
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
