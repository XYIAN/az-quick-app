import React from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { FaGithub } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import "./_footer.scss"; // Import styles

const Footer: React.FC = () => {
  return (
    <footer className={"footer"}>
      <Divider />
      <div className="flex justify-content-center gap-3">
        {/* Website Button */}
        <Button
          label="Website"
          icon="pi pi-globe"
          className={`p-button-secondary ${"animatedButton"}`}
          onClick={() => window.open("https://kyledilbeck.com", "_blank")}
        />

        {/* LinkedIn Button */}
        <Button
          label="LinkedIn"
          icon={<AiFillLinkedin size={18} />}
          className={`p-button-info ${"animatedButton"}`}
          onClick={() => window.open("https://linkedin.com/in/kxdilbeck", "_blank")}
        />

        {/* GitHub Button */}
        <Button
          label="GitHub"
          icon={<FaGithub size={18} />}
          className={`p-button-dark ${"animatedButton"}`}
          onClick={() => window.open("https://github.com/xyian", "_blank")}
        />
      </div>
    </footer>
  );
};

export default Footer;
