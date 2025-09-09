import FeedLayout from "../components/FeedLayout";
import BottomBar from "../components/BottomBar";

function OptionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <FeedLayout>
        <div className="h-[calc(100%-83px)] w-[50%] absolute -translate-x-1/2 left-1/2 border border-white border-t-0 border-b-0">
          <div className=" h-full overflow-auto">{children}</div>
          <BottomBar />
        </div>
      </FeedLayout>
    </div>
  );
}

export default OptionLayout;
