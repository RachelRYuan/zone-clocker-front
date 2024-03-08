import { FormEvent, useState, useContext, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Link,
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon.tsx";
import { LockIcon } from "./LockIcon.jsx";

export function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { login } = authContext;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hu");

    try {
      await login(formData);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage("Login failed");
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <div className="absolute top-[20%] px-5 py-8 bg-white max-w-[500px] w-[90%] border shadow-xl rounded">
        {/* Title */}
        <h1 className="pb-4 text-3xl text-center font-bold text-orange-600 block">
          Zone Clocker
        </h1>
        <Button onPress={onOpen} color="primary">
          Open Modal
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            {(onClose) => (
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Input
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      variant="bordered"
                      required
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <div className="flex py-2 px-1 justify-between">
                      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                      <Link color="primary" href="#" size="sm">
                        Forgot password?
                      </Link>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit">
                      Sign in
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
