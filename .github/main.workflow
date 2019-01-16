workflow "Build, Benchmark and Test" {
  on = "push"
  resolves = ["Benchmark", "Test"]
}

action "Build" {
  uses = "actions/npm@master"
  args = "install"
}

action "Benchmark" {
  uses = "actions/npm@master"
  needs = "Build"
  args = "run benchmark"
}

action "Test" {
  uses = "actions/npm@master"
  needs = "Build"
  args = "test"
}
