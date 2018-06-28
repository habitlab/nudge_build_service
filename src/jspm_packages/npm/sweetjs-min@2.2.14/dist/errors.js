"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expect = expect;
exports.assert = assert;
function expect(cond, message, offendingSyntax, rest) {
  if (!cond) {
    let ctx = "";
    if (rest) {
      ctx = rest.slice(0, 20).map(s => {
        let val = s.isDelimiter() ? "( ... )" : s.val();
        if (s === offendingSyntax) {
          return "__" + val + "__";
        }
        return val;
      }).join(" ");
    }
    throw new Error("[error]: " + message + "\n" + ctx);
  }
}

function assert(cond, message) {
  if (!cond) {
    throw new Error("[assertion error]: " + message);
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcnJvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFBZ0IsTSxHQUFBLE07UUFnQkEsTSxHQUFBLE07QUFoQlQsU0FBUyxNQUFULENBQWdCLElBQWhCLEVBQXNCLE9BQXRCLEVBQStCLGVBQS9CLEVBQWdELElBQWhELEVBQXNEO0FBQzNELE1BQUksQ0FBQyxJQUFMLEVBQVc7QUFDVCxRQUFJLE1BQU0sRUFBVjtBQUNBLFFBQUksSUFBSixFQUFVO0FBQ1IsWUFBTSxLQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWMsRUFBZCxFQUFrQixHQUFsQixDQUFzQixLQUFLO0FBQy9CLFlBQUksTUFBTSxFQUFFLFdBQUYsS0FBa0IsU0FBbEIsR0FBOEIsRUFBRSxHQUFGLEVBQXhDO0FBQ0EsWUFBSSxNQUFNLGVBQVYsRUFBMkI7QUFDekIsaUJBQU8sT0FBTyxHQUFQLEdBQWEsSUFBcEI7QUFDRDtBQUNELGVBQU8sR0FBUDtBQUNELE9BTkssRUFNSCxJQU5HLENBTUUsR0FORixDQUFOO0FBT0Q7QUFDRCxVQUFNLElBQUksS0FBSixDQUFVLGNBQWMsT0FBZCxHQUF3QixJQUF4QixHQUErQixHQUF6QyxDQUFOO0FBQ0Q7QUFDRjs7QUFFTSxTQUFTLE1BQVQsQ0FBZ0IsSUFBaEIsRUFBc0IsT0FBdEIsRUFBK0I7QUFDcEMsTUFBSSxDQUFDLElBQUwsRUFBVztBQUNULFVBQU0sSUFBSSxLQUFKLENBQVUsd0JBQXdCLE9BQWxDLENBQU47QUFDRDtBQUNGIiwiZmlsZSI6ImVycm9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBleHBlY3QoY29uZCwgbWVzc2FnZSwgb2ZmZW5kaW5nU3ludGF4LCByZXN0KSB7XG4gIGlmICghY29uZCkge1xuICAgIGxldCBjdHggPSBcIlwiO1xuICAgIGlmIChyZXN0KSB7XG4gICAgICBjdHggPSByZXN0LnNsaWNlKDAsIDIwKS5tYXAocyA9PiB7XG4gICAgICAgIGxldCB2YWwgPSBzLmlzRGVsaW1pdGVyKCkgPyBcIiggLi4uIClcIiA6IHMudmFsKCk7XG4gICAgICAgIGlmIChzID09PSBvZmZlbmRpbmdTeW50YXgpIHtcbiAgICAgICAgICByZXR1cm4gXCJfX1wiICsgdmFsICsgXCJfX1wiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9KS5qb2luKFwiIFwiKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiW2Vycm9yXTogXCIgKyBtZXNzYWdlICsgXCJcXG5cIiArIGN0eCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydChjb25kLCBtZXNzYWdlKSB7XG4gIGlmICghY29uZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlthc3NlcnRpb24gZXJyb3JdOiBcIiArIG1lc3NhZ2UpO1xuICB9XG59XG4iXX0=