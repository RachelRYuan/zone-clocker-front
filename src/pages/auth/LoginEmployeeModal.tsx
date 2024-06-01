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
import { LockIcon } from "./LockIcon.jsx";
import { AxiosError } from "axios";

export default function LoginEmployeeModal() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { login } = authContext;

  const handleChangeEmployee = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const [formDataEmployee, setFormDataEmployee] = useState<{ id_number: "" }>({
    id_number: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmitEmployee = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formDataEmployee.id_number) {
      setErrorMessage("Please enter your ID");
      return;
    }

    try {
      await login(formDataEmployee);
      navigate("/employee/home");
      setErrorMessage("");
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        setErrorMessage(err.response?.data?.error);
      }
    } finally {
      setFormDataEmployee({ id_number: "" });
    }
  };

  return (
    <>
      <Button
        onPress={() => {
          onOpen();
          setErrorMessage(null);
          setFormDataEmployee({ id_number: "" });
        }}
        className="bg-orange-600 text-white h-fit py-2"
      >
        Employee
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
              <form onSubmit={handleSubmitEmployee}>
                <ModalHeader className="flex flex-col gap-1">
                  Employee log in
                </ModalHeader>
                <ModalBody>
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="ID Number"
                    placeholder="Enter your ID number"
                    type="password"
                    id="id_number"
                    name="id_number"
                    onChange={handleChangeEmployee}
                    value={formDataEmployee.id_number}
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
                          setFormDataEmployee({ id_number: "" });
                        }}
                      >
                        Close
                      </Button>
                      <Button
                        color="primary"
                        type="submit"
                        className="bg-orange-600"
                      >
                        Log in
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
