import "./style.css";
import mobileCalculator from "./icons/mobile-calculator.png";
import chat from "./icons/chat-up.png";
import css from "./icons/css.png";
import express from "./icons/express.png";
import github from "./icons/github.png";
import html from "./icons/html.png";
import linkedin from "./icons/linkedin.png";
import mongo from "./icons/mongo.png";
import node from "./icons/nodeJS.png";
import react from "./icons/react.png";
import ticTacToe from "./icons/tic-tac-toe.png";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function App() {
  document.title = "Paulo Garcia | Web Developer";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  renderer.render(scene, camera);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  //light
  const pointLight = new THREE.PointLight(0xe3ad43);
  pointLight.position.set(12, 6, -8);
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);

  //controls
  const controls = new OrbitControls(camera, renderer.domElement);

  const moveCamera = () => {
    const t = document.body.getBoundingClientRect().top;

    if (t < 0) {
      camera.position.z = t * -0.01;
      camera.position.x = t * -0.0002;
      camera.rotation.y = t * -0.0002;
    }
  };
  document.body.onscroll = moveCamera;

  //objects

  const spaceTexture = new THREE.TextureLoader().load("./space.jpg");
  scene.background = spaceTexture;

  const addStar = () => {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
  };
  Array(200).fill().forEach(addStar);

  const moonTexture = new THREE.TextureLoader().load("./moon.jpg");
  const moonNormal = new THREE.TextureLoader().load("./moon_normal.jpg");

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: moonNormal,
    })
  );
  moon.position.set(6, 8, -20);
  scene.add(moon);

  const earthTexture = new THREE.TextureLoader().load("./earth.jpg");
  const earthNormal = new THREE.TextureLoader().load("./earth_normal.jpg");
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(10, 64, 64),
    new THREE.MeshStandardMaterial({
      map: earthTexture,
      normalMap: earthNormal,
    })
  );
  earth.position.set(-15, -14, 0);
  scene.add(earth);

  let rocket;
  const loader = new GLTFLoader();
  loader.load("./objects/rocket/scene.gltf", (gltf) => {
    gltf.scene.scale.set(0.3, 0.3, 0.3);
    gltf.scene.position.set(10, -4, -6);
    gltf.scene.rotateX(0.5);
    gltf.scene.rotateY(-1.5);
    scene.add(gltf.scene);
    rocket = gltf.scene.children[0];
  });
  let astronaut;
  loader.load("./objects/astronaut/scene.gltf", (gltf) => {
    gltf.scene.position.set(2, -3, -5);
    scene.add(gltf.scene);
    astronaut = gltf.scene.children[0];
  });
  let mug;
  loader.load("./objects/mug/scene.gltf", (gltf) => {
    gltf.scene.scale.set(0.01, 0.01, 0.01);
    gltf.scene.position.set(3, -1, -5);
    gltf.scene.rotateX(0.3);
    gltf.scene.rotateY(2.5);
    scene.add(gltf.scene);
    mug = gltf.scene.children[0];
  });
  let book;
  loader.load("./objects/book/scene.gltf", (gltf) => {
    gltf.scene.scale.set(0.25, 0.25, 0.25);
    gltf.scene.position.set(4, 0, -5);
    gltf.scene.rotateX(0.5);
    gltf.scene.rotateY(3.5);
    scene.add(gltf.scene);
    book = gltf.scene.children[0];
  });
  let pen;
  loader.load("./objects/pen/scene.gltf", (gltf) => {
    gltf.scene.scale.set(0.04, 0.04, 0.04);
    gltf.scene.position.set(3.2, 0.5, -5);
    gltf.scene.rotateX(-0.6);
    scene.add(gltf.scene);
    pen = gltf.scene.children[0];
  });

  //animation
  let windBool = true;
  const animate = () => {
    requestAnimationFrame(animate);

    moon.rotation.x += 0.001;
    moon.rotation.y += 0.003;
    moon.rotation.z += 0.001;

    earth.rotation.x += 0.0002;
    earth.rotation.y += 0.0004;
    earth.rotation.z += 0.0002;

    if (rocket && astronaut && mug && book && pen) {
      if (rocket.rotation.y > 0.05) {
        windBool = false;
      } else if (rocket.rotation.y < 0) {
        windBool = true;
      }
      rocket.rotation.y += windBool ? 0.00005 : -0.00005;
      astronaut.rotation.y += windBool ? 0.00005 : -0.00005;
      mug.position.x += windBool ? -0.005 : 0.005;
      mug.rotation.y += windBool ? 0.00005 : -0.00005;
      book.rotation.y += windBool ? -0.0005 : 0.0005;
      pen.rotation.y += windBool ? 0.0005 : -0.0005;
    }

    controls.update();

    renderer.render(scene, camera);
  };

  animate();

  return (
    <div>
      <main>
        <header>
          <h1>Paulo Garcia</h1>
          <p>Olá, eu sou um desenvolvedor web!</p>
        </header>

        <blockquote>
          <p>Sou um estudante dedicado que programa todos os dias.</p>
        </blockquote>

        <section className="left">
          <h2>Sobre mim</h2>
          <p>
            Tenho 22 anos e desde pequeno gosto de computadores e assuntos
            relacionados, por isso decidi fazer um curso na área e seguir
            carreira profissional. Gosto de estudar e dedico um tempo para isso
            todos os dias, além de ter a leitura como principal hobby durante as
            horas vagas.
          </p>
          <p>
            Atualmente não trabalho na área, tendo focado toda a minha atenção
            nos estudos e portanto ainda não possuo experiência profissional.
            Procuro por um estágio para cumprir os requisitos para a conclusão
            do curso de Análise e Desenvolvimento de Sistemas no IFTM, porém,
            não tenho nenhum problema quanto a ser efetivado e continuar
            trabalhando após o período de estágio estar finalizado.
          </p>

          <p>
            Sou autodidata, tenho facilidade de aprendizado e estou sempre
            procurando aprimorar-me. Além disso, sou uma pessoa dedicada,
            curiosa e versátil que uma vez dominada por uma ideia fará todo o
            possível para alcançar tal objetivo, porém não de maneira apressada.
            Procuro sempre estar bem informado e pronto antes de tomar uma
            decisão, de forma que eu me sinta seguro quanto às afirmações feitas
            ao invés de confiar em suposições mal elaboradas.
          </p>
        </section>

        <blockquote>
          <p>
            Só se pode alcançar um grande êxito quando nos mantemos fiéis a nós
            mesmos.
            <br />
            -Friedrich Nietzsche
          </p>
        </blockquote>

        <section className="light">
          <h2>Tecnologias</h2>
          <div className="display">
            <div className="tec-icon">
              <img src={mongo} alt="MongoDB" />
            </div>

            <div className="tec-icon">
              <img src={express} alt="Express" />
            </div>

            <div className="tec-icon">
              <img src={react} alt="React" />
            </div>

            <div className="tec-icon">
              <img src={node} alt="Node.JS" />
            </div>

            <div className="tec-icon">
              <img src={css} alt="css" />
            </div>
            <div className="tec-icon">
              <img src={html} alt="html" />
            </div>
          </div>
        </section>

        <section className="left">
          <h2>Projetos</h2>

          <h3>Chat-up</h3>
          <div>
            <a
              href="https://client-chat-up.herokuapp.com/"
              rel="noreferrer"
              target="_blank"
            >
              <div>
                <img src={chat} alt="chat-up" />
              </div>
            </a>
            <span>
              Dos apresentados aqui, com certeza o projeto mais completo. É uma
              aplicação de chat funcional. Porém, como está sendo hospedado de
              forma gratuita no{" "}
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.heroku.com/"
              >
                Heroku
              </a>
              , ele pode demorar um pouco para iniciar tanto o cliente como o
              servidor.
            </span>
          </div>
          <h3>Mobile Calculator</h3>
          <div>
            <a
              href="https://github.com/garcia-paulo/mobile-calculator"
              rel="noreferrer"
              target="_blank"
            >
              <div>
                <img src={mobileCalculator} alt="mobile-calculator" />
              </div>
            </a>
            <span>
              Projeto criado enquanto eu aprendia React Native. Uma calculadora
              feita com React Native, eu não recomendo a instalação de .apks
              desconhecidos mas caso queira se arriscar aqui está o link do{" "}
              <a
                href="https://github.com/garcia-paulo/mobile-calculator/releases/tag/v1.0"
                rel="noreferrer"
                target="_blank"
              >
                projeto
              </a>
              .
            </span>
          </div>
          <h3>Tic Tac Toe</h3>
          <div>
            <a
              href="https://garcia-paulo.github.io/tic-tac-toe/"
              rel="noreferrer"
              target="_blank"
            >
              <div>
                <img src={ticTacToe} alt="tic-tac-toe" />
              </div>
            </a>
            <span>
              Outro projeto feito apenas pelo aprendizado. É um simples jogo da
              velha que pode ser jogado localmente ou contra um bot. Possui suas
              falhas, mas cumpre seu propósito.
            </span>
          </div>
        </section>

        <section>
          <div>
            <h2>Contato</h2>
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              paulo.garcia.fl@gmail.com
            </p>
            <div className="display" style={{ marginTop: "30px" }}>
              <a
                href="https://github.com/garcia-paulo"
                rel="noreferrer"
                target="_blank"
              >
                <div className="display-icon">
                  <img src={github} className="icon" alt="github" /> <br />
                  <h3 style={{ marginTop: "0px" }}>github</h3>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/paulo-garcia-1b1405168"
                rel="noreferrer"
                target="_blank"
              >
                <div className="display-icon">
                  <img src={linkedin} className="icon" alt="linkedin" />
                  <br />
                  <h3 style={{ marginTop: "0px" }}>linkedin</h3>
                </div>
              </a>
            </div>

            <h2>Créditos</h2>
            <p>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://sketchfab.com/3d-models/little-astronaut-5bb793a440164595ac4cb605822b2d88"
              >
                Little astronaut
              </a>{" "}
              - Rude Randal <br />
              <a
                rel="noreferrer"
                target="_blank"
                href="https://sketchfab.com/3d-models/mug-17c4808537f1448590378b3643c6da72"
              >
                Mug
              </a>{" "}
              - Microsoft
              <br />
              <a
                rel="noreferrer"
                target="_blank"
                href="https://sketchfab.com/3d-models/open-wedding-album-mockup-5facd64776f24b89af2fb7af2d05e892"
              >
                Open Wedding Album Mockup
              </a>{" "}
              - Pedro França <br />
              <a
                rel="noreferrer"
                target="_blank"
                href="https://sketchfab.com/3d-models/rocket-36ac04d6203545b1baf56c4cbf89349b"
              >
                Rocket
              </a>{" "}
              - Rafa Andrade <br />
              <a
                rel="noreferrer"
                target="_blank"
                href="https://sketchfab.com/3d-models/simple-pen-be6e3308c49841778c4de0cabf36432e"
              >
                Simple Pen
              </a>{" "}
              - Blender3D <br />
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
