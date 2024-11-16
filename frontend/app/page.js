import Image from "next/image";
import Navbar from "@/components/Navbar";
import VideoBox from "@/components/ui/VideoBox";
import MainTimeline from "@/components/timeline/MainTimeline";
// import NewVideoBox from "@/components/ui/NewVideoBox";

export default function Home() {
  return (
      <div className="bg-black flex flex-row">
        <div><Navbar/> </div>
          <div className="flex flex-col-reverse">
            <div><VideoBox/></div>
            {/* <div><MainTimeline/></div> */}
          </div>
      </div>
      
  );
}
