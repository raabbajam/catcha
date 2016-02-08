import test from "tape"
import catcha from "../src"

test("catcha", (t) => {
  t.plan(1)
  t.equal(true, catcha(), "return true")
})
