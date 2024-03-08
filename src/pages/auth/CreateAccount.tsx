import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

export function CreateAccount() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("https://zone-clocker-back.onrender.com/api/auth/create-account", {
        name: name,
        email: email,
        password: password,
        company_email: companyEmail,
        company_name: companyName,
      });
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as AxiosError;
        setErrorMessage("Login failed");

        console.log(axiosError.response);
      }
    }
  };

  return (
    <>
      <p
        className="text-blue-900 underline cursor-pointer text-center mt-4"
        onClick={onOpen}
      >
        Create an account
      </p>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="w-fit"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Create admin account
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Company name"
                  placeholder="Enter company name"
                  variant="bordered"
                  required
                  type="text"
                  id="company_name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <Input
                  autoFocus
                  label="Company email"
                  placeholder="Enter company email"
                  variant="bordered"
                  required
                  type="email"
                  id="company_email"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                />
                <Input
                  autoFocus
                  label="Your name"
                  placeholder="Enter your name"
                  variant="bordered"
                  required
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  autoFocus
                  label="Your email"
                  placeholder="Enter your email"
                  variant="bordered"
                  required
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  label="Password"
                  placeholder="Enter your password"
                  variant="bordered"
                  required
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex py-2 px-1 justify-between">
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" className="bg-orange-600">
                  Create account
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
{
  /* <form onSubmit={handleSubmit} className="p-2">
          <div className="mb-4 flex flex-col items-start">
            <label
              htmlFor="company_name"
              className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Company Name
            </label>
            <input
              required
              type="text"
              id="company_name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 py-3 px-2 border rounded-md text-xs w-[100%] focus:outline-none"
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label
              htmlFor="company_email"
              className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Company Email
            </label>
            <input
              required
              type="email"
              id="company_email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              className="mt-1 py-3 px-2 border rounded-md text-xs w-[100%] focus:outline-none"
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label
              htmlFor="email"
              className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Your Email
            </label>
            <input
              required
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 py-3 px-2 border rounded-md text-xs w-[100%] focus:outline-none"
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label
              htmlFor="name"
              className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Your Name
            </label>
            <input
              required
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 py-3 px-2 border rounded-md text-xs w-[100%] focus:outline-none"
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label
              htmlFor="password"
              className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 py-3 px-2 border rounded-md text-xs w-[100%] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full uppercase text-center py-3 px-2 mb-4 bg-orange-600 text-white text-sm font-normal rounded"
          >
            CREATE ACCOUNT
          </button>

          <div className="flex items-end justify-end">
            <Link to="/login">
              <p className="text-blue-900 underline cursor-pointer">Login instead</p>
            </Link>
          </div>
        </form> */
}
