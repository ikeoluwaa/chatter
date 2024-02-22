import { useState } from "react";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="register">
      <h2>Register</h2>
      <div className="flex gap-20">
        <div className="flex flex-col gap-3">
          <label htmlFor="firstName">First name</label>
          <input type="text" id="firstName" />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="lastName">Last name</label>
          <input type="text" id="lastName" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="userRole">You are joining as</label>
        <select id="userRole">
          <option value="Writer">Writer</option>
          <option value="Reader">Reader</option>
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Email" />
      </div>

      <div className="flex flex-col gap-3 relative">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <button
          className="self-end	"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
      </div>

      <button>Create Account</button>

      <div className="flex flex-col gap-3">
        <button>Sign up with Google</button>
        <button>Sign up with Linkedin</button>
      </div>
    </form>
  );
}
