import { AppProps } from 'next/app';
import '../styles/tailwind.css';

const myApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default myApp;
