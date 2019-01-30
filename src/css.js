export default `
  .wrapper {
    all: initial;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu;
    display: flex;
    width: 100vw;
    height: 100vh;
  }

  .content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0 0 0 30px;
  }

  .contentComponent {
    overflow-y: auto;
    padding-right: 30px;
    flex-grow: 1;
  }

  nav {
    width: 150px;
    background-color: #F1F1F1;
    padding: 0 30px;
  }

  nav .page {
    font-size: 16px;
    color: black;
    margin-bottom: 7px;
  }

  nav .page.selected {
    font-weight: bold;
  }

  h1 {
    font-size: 30px;
    font-weight: normal;
  }

  h2 {
    font-size: 23px;
    font-weight: normal;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  table thead {
    border-bottom: 3px solid black;
    padding-bottom: 5px;
  }

  th {
    text-align: left;
  }

  td, th {
    padding: 10px 0;
  }
`
