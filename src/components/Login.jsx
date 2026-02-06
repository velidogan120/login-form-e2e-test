import { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { useNavigate } from "react-router";

import axios from "axios";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

const errorMessages = {
  email: "Please enter a valid email address",
  password: "Password must be at least 4 characters long",
};

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const newErrors = {};

    if (!emailRegex.test(form.email)) {
      newErrors.email = errorMessages.email;
    }

    if (!form.password) {
      newErrors.password = "Şifre zorunlu";
    } else if (!strongPasswordRegex.test(form.password)) {
      newErrors.password =
        "Şifre en az 8 karakter, büyük harf, küçük harf, rakam ve özel karakter içermelidir.";
    }

    if (!form.terms) {
      newErrors.terms = "You must accept the terms";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [form]);

  const handleChange = (event) => {
    let { name, value, type, checked } = event.target;
    value = type === "checkbox" ? checked : value;

    const newForm = { ...form, [name]: value };
    setForm(newForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) return;

    axios
      .get("https://6540a96145bedb25bfc247b4.mockapi.io/api/login")
      .then((res) => {
        const user = res.data.find(
          (item) => item.password == form.password && item.email == form.email,
        );
        if (user) {
          setForm(initialForm);
          navigate("/success");
        } else {
          navigate("/");
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          invalid={!!errors.email}
          data-cy="email-input"
        />
        {errors.email && (
          <FormFeedback className="text-danger">{errors.email}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          invalid={!!errors.password}
          data-cy="password-input"
        />
        {errors.password && (
          <FormFeedback className="text-danger">{errors.password}</FormFeedback>
        )}
      </FormGroup>

      <FormGroup check className="mt-2">
        <Input
          id="terms"
          name="terms"
          type="checkbox"
          checked={form.terms}
          onChange={handleChange}
          invalid={!!errors.terms}
          data-cy="terms-checkbox"
        />
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
        {errors.terms && (
          <FormFeedback className="text-danger">{errors.terms}</FormFeedback>
        )}
      </FormGroup>

      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid} data-cy="submit-button">
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
