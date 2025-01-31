import { Link } from "react-router-dom";
import { TbArrowLeft } from "react-icons/tb";

export default function LoginPage() {
  return (
    <div>
      <nav>
        <Link to="/">
          <TbArrowLeft />
        </Link>
      </nav>
      <div>
        <section>
          <img src="" alt="" />
        </section>
        <section>
          <div>
            Login Page
          </div>
        </section>
      </div>
    </div>
  );
}
