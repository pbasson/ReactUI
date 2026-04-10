import Image from "next/image";

function About() {
    const headerTxt = "About Page";
    const imageSrc = "next.svg";
    const size = 50;
    const description = "Senior Full Stack .NET Developer with 8+ years’ experience delivering enterprise applications across backend APIs, databases, and frontend systems. Skilled in SQL, ASP.NET Core, MVC, Blazor, and microservices, with a proven track record of modernising legacy systems and leading greenfield and legacy projects. <br /> <br /> Strong in system analysis, database design, and structured problem solving, creating maintainable, testable solutions with xUnit, bUnit, Moq, and supporting reliable CI/CD releases via Azure DevOps. Experienced in collaborating with product and stakeholders, refining acceptance criteria, and producing structured documentation to ensure accurate implementation. <br /> <br /> Open to Senior / Lead .NET roles (Remote / Hybrid) with ownership of delivery and architecture.";
    
    const style = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        backgroundColor: "#f0f0f0",
        padding: "1rem",
        borderRadius: "8px"
    };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1>{headerTxt}</h1>

        <div style={style}>
            <Image src={imageSrc} alt="Profile Photo" width={size} height={size}  /> 
            <p> {description}</p>

        </div>

    </div>
  );
}

export default About;        