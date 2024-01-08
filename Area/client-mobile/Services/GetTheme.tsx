

export type Theme = {
  theme: string;
  backgroundColor: string;
  color: string;
  colorButton: string;
  blue: string;
};

function  GetTheme(theme:string): Theme {
  switch (theme) {
    case "light":
        return {
            theme: 'light',
            backgroundColor: 'white',
            color: '#1E1E1E',
            colorButton: "white",
            blue: '#0066FF',
        };
    case "dark":
        return {
            theme: 'dark',
            backgroundColor: '#1E1E1E',
            color: 'white',
            colorButton: "#1E1E1E",
            blue: '#0066FF',
        };
    default:
        return {
            theme: 'light',
            backgroundColor: 'white',
            color: '#1E1E1E',
            colorButton: "white",
            blue: '#0066FF',
        }
  }
}

export default GetTheme;