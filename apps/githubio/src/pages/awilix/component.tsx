import { asClass, createContainer } from "awilix";
import React from "react";

class MyClass {
  private id = crypto.randomUUID();

  constructor() {
    console.log("create my class " + this.id);
  }
  dispose() {
    console.log("dispose my class " + this.id);
  }
}

class MyClass2 {
  private id = crypto.randomUUID();

  constructor() {
    console.log("create my class 2 " + this.id);
  }
  dispose() {
    console.log("dispose my class 2 " + this.id);
  }
}

interface AppCradle {
  myClass: MyClass;
  myClass2: MyClass2;
}

const container = createContainer<AppCradle>({
  strict: true,
  injectionMode: "PROXY",
});

container.register({
  myClass: asClass(MyClass)
    .scoped()
    .disposer((i) => i.dispose()),
});

const Child = () => {
  React.useEffect(() => {
    const scope = container.createScope();

    const { myClass } = scope.cradle;

    console.log(myClass);

    return () => {
      scope.dispose();
    };
  }, []);

  return <div>child</div>;
};

export const Component = () => {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <h1>parent</h1>
      {show && <Child />}
      <button
        onClick={() => {
          setShow((p) => !p);
        }}
      >
        toggle
      </button>
    </div>
  );
};
