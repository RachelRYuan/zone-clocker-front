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
import { AxiosError } from "axios";

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

    if (!formDataAdmin.email || !formDataAdmin.password) {
      setErrorMessage("All inputs are required");
      return;
    }

    try {
      await login(formDataAdmin);
      navigate("/home");
      setErrorMessage("");
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        setErrorMessage(err.response?.data?.error);
      }
    } finally {
      setFormDataAdmin({ email: "", password: "" });
    }
  };

  return (
    <>
      <Button
        onPress={() => {
          onOpen();
          setErrorMessage("");
          setFormDataAdmin({ email: "", password: "" });
        }}
        className="bg-orange-600 text-white h-fit py-2"
      >
        Admin
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="w-fit sm:w-[600px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">Admin log in</ModalHeader>
                <ModalBody>
                  <p className="text-xs mt-[-21px]">
                    Are you a curious guest? Use 'guest@gmail.com' as email and 'guest' as
                    password
                  </p>
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
                </ModalBody>
                <ModalFooter>
                  <div>
                    <div className="flex gap-1">
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                          onClose();
                          setErrorMessage("");
                          setFormDataAdmin({ email: "", password: "" });
                        }}
                      >
                        Close
                      </Button>
                      <Button color="primary" type="submit" className="bg-orange-600">
                        Sign in
                      </Button>
                    </div>
                    {errorMessage && (
                      <p className="text-red-500 text-right mt-2 text-sm">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
