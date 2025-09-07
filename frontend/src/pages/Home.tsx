import DynamicText from "../components/DynamicText";
import WithBgLayout from "../components/WithBgLayout";

function Home() {
  return (
    <div>
      <WithBgLayout>

        <div
          style={{ fontFamily: "cream" }}
          className="text-8xl text-[#FFBF78] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <h1 className="text-center">Made for bros</h1>
          <h1 className="text-center">Made by bros</h1>
          <DynamicText />
        </div>
      </WithBgLayout>
    </div>
  ); //use bg layout in signin and signup
}

export default Home;
