class Tester {
    name: string = "GermánR";
  
    startAutomation(): void {
      console.log("Iniciando pruebas de automatización");
    }
  }
  
  const QE = new Tester();
  console.log(QE.name); // saca el nombre
  QE.startAutomation(); // saca mensaje de inicio de pruebas