# JSX Syntax Guide

JSX (JavaScript XML) is a syntax extension for JavaScript recommended by React for describing what the UI should look like. It looks like a template language but comes with the full power of JavaScript.

## Basic Syntax

### Element Rendering

```jsx
// Basic element
const element = <h1>Hello, world!</h1>;

// With child elements
const element = (
  <div>
    <h1>Hello!</h1>
    <p>Good to see you here.</p>
  </div>
);
```

### Using JavaScript Expressions

You can embed any JavaScript expression in JSX using curly braces `{}`:

```jsx
const name = "Josh Perez";
const element = <h1>Hello, {name}</h1>;

// Also works in attributes
const imgUrl = "https://example.com/image.jpg";
const element = <img src={imgUrl} alt="Description" />;
```

## JSX Attributes

### Basic Attributes

```jsx
// String literals
const element = <div className="container">Hello</div>;

// JavaScript expressions
const element = <img src={user.avatarUrl} alt="User avatar" />;
```

### Spread Attributes

```jsx
// Pass all props
const props = { firstName: "Ben", lastName: "Hector" };
const element = <Greeting {...props} />;

// Selectively pass props
const { kind, ...other } = props;
const element = <Button {...other} />;
```

### Special Cases: null and undefined

In JSX, `null` and `undefined` can safely be used with the spread operator:

```jsx
// This won't throw an error even if userProps is null or undefined
const userProps = null;
const element = <User {...userProps} />;

// Equivalent to:
const element = <User />;
```

This behavior is different from regular JavaScript objects where using `{...null}` would throw an error:

```js
// This would throw an error: TypeError: Cannot convert undefined or null to object
const obj = { ...null };
```

React specially handles this case to allow components to flexibly accept potentially empty prop objects.

## Conditional Rendering

### Ternary Expressions

```jsx
const element = <div>{isLoggedIn ? <UserGreeting /> : <GuestGreeting />}</div>;
```

### Logical && Operator

```jsx
const element = (
  <div>
    {unreadMessages.length > 0 && (
      <h2>You have {unreadMessages.length} unread messages.</h2>
    )}
  </div>
);
```

## List Rendering

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => (
  <li key={number.toString()}>{number}</li>
));

const element = <ul>{listItems}</ul>;
```

## JSX Prevents Injection Attacks

React DOM escapes any values embedded in JSX before rendering them, which helps prevent XSS attacks:

```jsx
const title = "This string is safe <script>alert('dangerous');</script>";
// React will escape content in title
const element = <h1>{title}</h1>;
```

## JSX Represents Objects

Babel compiles JSX down to `React.createElement()` function calls:

```jsx
const element = <h1 className="greeting">Hello, world!</h1>;

// Equivalent to
const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, world!",
);
```

## Fragment Syntax

```jsx
// Long syntax
const element = (
  <React.Fragment>
    <h1>Title</h1>
    <p>Paragraph</p>
  </React.Fragment>
);

// Short syntax
const element = (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);
```

## Custom Components

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
```

## Advanced Techniques

### Dynamic Components

```jsx
const components = {
  photo: PhotoStory,
  video: VideoStory,
};

function Story(props) {
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

### Props Spreading

```jsx
function App() {
  const buttonProps = {
    type: "submit",
    className: "primary",
    onClick: () => console.log("clicked"),
  };

  return (
    <Button {...buttonProps} disabled>
      Click me
    </Button>
  );
}
```
