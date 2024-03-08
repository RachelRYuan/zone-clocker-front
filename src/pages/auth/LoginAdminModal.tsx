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
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon.tsx";
import { LockIcon } from "./LockIcon.jsx";

export default function LoginAdminModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formDataAdmin, setFormDataAdmin] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { login } = authContext;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataAdmin((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(formDataAdmin);
      navigate("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage("Login failed");
      }
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-orange-600 text-white h-fit py-2">
        Admin
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
                    value={formDataAdmin.email}
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
                    value={formDataAdmin.password}
                    onChange={handleChange}
                  />
                  <div className="flex py-2 px-1 justify-between">
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
    </>
  );
}
