import LoginEmployeeModal from "./LoginEmployeeModal";
import LoginAdminModal from "./LoginAdminModal";

export function Login() {
  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <div className="absolute top-[25%] px-5 py-8 bg-white max-w-[500px] w-[30%] border shadow-xl rounded-lg">
        {/* Title */}
        <h1 className="pb-6 text-5xl text-center font-bold text-orange-600 block">
          Zone Clocker
        </h1>
        <div className=" flex flex-row gap-4 align-middle justify-center">
          <LoginEmployeeModal />
          <LoginAdminModal />
        </div>
      </div>
    </div>
  );
}
