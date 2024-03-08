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
    console.log(formDataEmployee);
  };

  const [formDataEmployee, setFormDataEmployee] = useState<{ id_number: "" }>({
    id_number: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmitEmployee = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formDataEmployee.id_number === "") {
      setErrorMessage("Please enter your ID");
    } else {
      setErrorMessage(null);
    }

    try {
      await login(formDataEmployee);
      navigate("/employee/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button onPress={onOpen} className="bg-orange-600 text-white h-fit py-2">
        Employee
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmitEmployee}>
                <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                <ModalBody>
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    type="text"
                    id="id_number"
                    name="id_number"
                    onChange={handleChangeEmployee}
                    value={formDataEmployee.id_number}
                  />
                </ModalBody>

                <ModalFooter>
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Log in
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
