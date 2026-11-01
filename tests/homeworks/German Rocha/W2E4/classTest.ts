class Tester {
    name: string = "GermánR";
  
    startAutomation(): void {
      console.log("Iniciando pruebas de automatización");
    }
  }
  
  const QE = new Tester();
  // saca el nombre
  console.log(QE.name); 
  // saca mensaje de inicio de pruebas
  QE.startAutomation(); 