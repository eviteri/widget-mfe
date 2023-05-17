const fs = require('fs')
const { version } = require('./package.json')
const { exec } = require('node:child_process')

const deployDir = './deploy'
const buildDir = './build'
const destinationPath = `${deployDir}/v${version}`

// Clearing Deploy Directory
if (fs.existsSync(deployDir)) {
  console.log('Clearing deploy directory')
  fs.rmSync(deployDir, { recursive: true })
}

// Clearing Build Directory
if (fs.existsSync(buildDir)) {
  console.log('\nClearing build directory')
  fs.rmSync(buildDir, { recursive: true })
}

console.log('\nRunning Build')
exec('npm run build:mfe', (err, output) => {
  // once the command has completed, the callback function is called

  if (err) {
    // log and return if we encounter an error
    console.error('\ncould not execute command: ', err)
    return
  }

  // log the output received from the command
  console.log('\nBuild Output: \n', output)

  // console.log('\nCreating new deploy/version folder')
  fs.mkdirSync(destinationPath, { recursive: true })

  fs.rename(buildDir, destinationPath, function (err) {
    if (err) {
      throw err
    } else {
      console.log(`\nSuccessfully moved the files to ${destinationPath}`)
    }
  })
})
