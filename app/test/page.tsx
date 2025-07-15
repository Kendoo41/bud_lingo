import SidebarItem from "@/components/SidebarItem";
import { getCourses } from "@/db/exercise"
import { getUserProgress, getUnits } from "@/db/exercise";
import { getCoursesById } from "@/db/queries";

const TestPage = async () => {
  //PASS const dataSQL = await getCourses();
  //PASS const dataSQL = await getUserProgress();
  //PASS const dataSQL = await getCoursesById(2);
  const dataSQL = await getUnits();
  return (
    <div className="font-bold flex flex-row h-full w-full justify-center items-center">
      {JSON.stringify(dataSQL, null, 2)}
    </div>
  )
}

export default TestPage