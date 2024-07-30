self-shunt-test-example
---

A demonstration of the "Self-Shunt Unit Testing Pattern" in Javascript. Followed by my thoughts.

As described in this 2001 paper by Michael Feathers:
https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=3e1876a233963013d84bcba6a66289d623c63d57

The motivation for this pattern is described as to avoid having to make a mock object - at least until a later refactor. It may perhaps also be useful to help developers understand what a mock is doing in simple terms, without introducing a mocking library.

I don't like it, and definitely wouldn't use it in Javascript.

Compositing and conflating the test function and mock together is inherently complex and has various downsides. It can cause a loss of control over the shape of the mock being passed. The mock could carry additional "pollution" from the test function or in creation of the mock itself. In this example, node's built-in test runner does not pollute the mock, but if using other tooling like mocha it would. This mock is polluted by having a propery `lastItem` which is fine (and could be avoided) in this case, but could cause a bug if there were a naming conflict. If multiple mocks were required, this pattern does not scale, as each mock is also conflated. For example, imagine passing multiple mocks that all had a `validate` method and that required different behaviour.

I don't believe this pattern is very friendly to a new developer due to the conflation of two separate concerns, and the use of `this` which can be difficult to understand and reason about. Nor is it friendly to the seasoned developer, because injecting the test function into the object under test is very unexpected.

Comparing the tests side by side, this solution doesn't seem to solve any problem. The mock is no harder to write, and I didn't need a mocking library to do so. I was able to write both while staying "in context" of the test I was writing.

In Javascript, it's possible to attach the mock functionality directly to a the particular test function, and to maintain test isolation. This is likely to break in OO languages, as mock behaviour is attached to the test class as a whole - not to an individual test. Indeed this is the case in the originally presented solution.
