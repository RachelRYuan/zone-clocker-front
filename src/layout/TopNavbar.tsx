import { useEffect } from "react";
import { RootState, AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../slices/account/accountSlice";

const TopNavbar = () => {
  const dispatch: AppDispatch = useDispatch();

  const { accountList } = useSelector((state: RootState) => state.account);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);
  return (
    <div className="flex flex-col w-full bg-white text-gray-600">
      <div
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
        className="flex justify-between items-center py-3 px-8"
      >
        <h1 className="text-3xl font-bold text-orange-600 block sm:hidden">
          ZC
        </h1>
        <h1 className="text-3xl font-bold text-orange-600 hidden sm:block">
          Zone Clocker
        </h1>
        <div className="flex flex-col sm:flex-row sm:gap-4 text-right">
          <p className="sm:text-sm text-sm text-gray-600 font-semibold">
            Company: {accountList[0]?.company_name}
          </p>
          <p className="sm:text-sm text-sm text-gray-600 font-semibold">
            User: {accountList[0]?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
