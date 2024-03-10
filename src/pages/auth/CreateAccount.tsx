import { ChangeEvent, FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    company_name: "",
    company_email: "",
    name: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("here", e.target.value);

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("https://zone-clocker-back.onrender.com/api/auth/create-account", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        company_email: formData.company_email,
        company_name: formData.company_name,
      });
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        setErrorMessage(err.response?.data?.error);
      }
    }
  };

  return (
    <>
      <p
        className="text-blue-900 underline cursor-pointer text-center mt-4"
        onClick={() => {
          onOpen();
          setErrorMessage("");
          setFormData({
            email: "",
            password: "",
            company_name: "",
            company_email: "",
            name: "",
          });
        }}
      >
        Create an account
      </p>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="w-fit sm:w-[600px]"
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
                  name="company_name"
                  onChange={handleChange}
                  value={formData.company_name}
                />
                <Input
                  autoFocus
                  label="Company email"
                  placeholder="Enter company email"
                  variant="bordered"
                  required
                  type="email"
                  id="company_email"
                  name="company_email"
                  value={formData.company_email}
                  onChange={handleChange}
                />
                <Input
                  autoFocus
                  label="Your name"
                  placeholder="Enter your name"
                  variant="bordered"
                  required
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input
                  autoFocus
                  label="Your email"
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
                  label="Password"
                  placeholder="Enter your password"
                  variant="bordered"
                  required
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
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
                        setFormData({
                          email: "",
                          password: "",
                          company_name: "",
                          company_email: "",
                          name: "",
                        });
                      }}
                    >
                      Close
                    </Button>
                    <Button color="primary" type="submit" className="bg-orange-600">
                      Create account
                    </Button>
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 text-right mt-2 text-sm">{errorMessage}</p>
                  )}
                </div>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
