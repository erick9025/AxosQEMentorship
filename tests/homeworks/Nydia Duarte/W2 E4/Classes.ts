class Tester {
    name: string = "Nydia";
  
    startAutomation(): void {
      console.log("Starting automation tests");
    }
  }
  
  // Usage
  const qa = new Tester();
  console.log(qa.name); // Nydia
  qa.startAutomation(); // Starting automation tests