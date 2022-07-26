
# Image Processing API

An API that can be used in two different ways. As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters for rapid prototyping. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout your site.

## Flow chart
![Alt text](docs/flow_chart.png?raw=true "Flow Chart")

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`



## Run Locally

Clone the project

```bash
  git clone https://github.com/husseinshaltout/image-processing-api.git
```

Go to the project directory

```bash
  cd image-processing-api
```

Install dependencies

```bash
  npm install
```

Start the server for production (uses dist directory)

```bash
  npm run start
```
Start the server for development (uses ts files)

```bash
  npm run dev
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Build
To build, run the following command
```bash
  npm run build
```

## Usage/Examples

```bash
http://localhost:3000/api/images?filename=fjord&width=50&height=50
```


## Authors

- [@husseinshaltout](https://www.github.com/husseinshaltout)

