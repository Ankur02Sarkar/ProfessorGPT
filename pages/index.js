import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from "axios";
import { useState } from "react";
import classNames from 'classnames';
import { BsFillSendFill } from "react-icons/bs";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [query, setQuery] = useState("");
  const [parsedText, setParsedText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [contents, setContents] = useState("");
  const [filename, setFilename] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("http://localhost:8000/pdf", formData);
    setContents(response.data.contents);
    setFilename(file.name)
    const pdfContext = await axios.get("http://localhost:8000/api", {
      params: {
        query: "All of the following questions must be answered strictly according to the following context :- \n"
          + response.data.contents
      },
    })
  };
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleBsFillSendFillClick = async () => {
    try {
      const {
        data: { message },
      } = await axios.get("http://localhost:8000/api", {
        params: {
          query:
            query
          // + "\n Answer the above question with respect to the context below. The response should not exceed 300 characters :- \n" +
          // contents,
        },
      });
      setData((prevData) => [...prevData, { query, response: message }]);
      setQuery("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1>Welcome to ProfessorGPT</h1>
        <div align="center" className={styles.formDiv}>
          <form onSubmit={handleSubmit}>
            <label>
              <input type="file" onChange={handleFileChange} />
            </label>
            <button type="submit">Scan PDF</button>
          </form>
        </div>

        {(contents && <>
          <div className={styles.gridContainer}>
            <div >
              <div className={styles.response}>
                <p>{filename} has been Scanned</p>
              </div>
            </div>
            {data.map((item, index) => (
              <div key={index} className={styles.queryResponse}>
                <div className={styles.query}>
                  <p>{item.query}</p>
                </div>
                <div className={styles.response}>
                  <p>{item.response}</p>
                </div>
              </div>
            ))}
          </div>
          <div align="center" className={classNames(styles.formDiv, 'queryForm')}>
            <form className={styles.formMain}>
              <label>
                <input type="text" value={query} onChange={handleInputChange} />
              </label>
              <BsFillSendFill className={styles.sendIcon} onClick={handleBsFillSendFillClick} />
            </form>
          </div>

        </>)}
      </div>
      {/* <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.js</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main> */}
    </>
  )
}
