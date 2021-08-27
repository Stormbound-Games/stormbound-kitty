/**
 * 1. Reset <button> default styling
 */
const cta = {
  fontSize: '11.52px',
  border: 0 /* 1 */,
  backgroundColor: 'transparent' /* 1 */,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left, right',
  backgroundSize: 'contain',
  backgroundImage: [
    "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAABTCAYAAAAPx14WAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAADgElEQVRoQ9Wbv2pUQRTGFQIKIukk3bZ2i0+wLxCIhbZaWftGgpjOwsIHSSEkIGjrI1hYrN8nM8t457uzs3fmnLkpftzsnXO+P8tm2SXkwX6/XzU/767PwTOwmyIX1gRCPgXvwH6KXFgDCMdnfAvex7BT5OJoEIzBr9KgCrk8EoSqCk6kwCgQqDo4kSIjQJhS8Ldgne82CFIKzvs8J/wFXk/4EKom+NX3bx//O5eCXsRQaaCEYnAiRT2AeVNwIoWtgXFzcCLFLYFpl+BEGlgBw27BiTSxAGZdgxNp1BsYdQ9OpFlPYGISnEjDXsDALDiRpj2AuGlwIo1bgbB5cCLNW4CoS3AiAywFgm7BiQyxBIiVgvPz+HmY2/YITmSQJUBs8+P2U2YQgu6SuVWGr33m1/eyIRAsFfj3mk/nWgvIEC1A1K2ADFADli/UfYIzlwLS/BhYfAV+86rOCc7MC0jjElhi8D9BgNdhBaTpHFhIg0eGFZCGCgyr4JEhBaTZFAyWgkfcC0ijFAzVBI+4FpAmEQyUgv8S94hbAWlAcFgK/hk8Dld17lJgTvxY8LMwdxYeqznzAkq0KngyP6zAVOyk4MnekAKpyKLgEZ6HObVvUiAuNwWPcC7MK52aAvzcr3ZlAT64BHPBv4Kq4BHOhz2lR59LtUdwtlO/mOEb2iaZ24DX/OEC3IFsCfC9/HlqcAzOhz2lRx/5URr3T3/mw40uBTgX5pXOseDLXvPhoKkAz8Oc2u8enEyFFhXg/XCu9kyCEyV4UgE+DvfVvFlwkomGhaoCvIbHas40OMmEIzg8VuBluKpz8+AkE0/BQKnAHC7BSWYwBUOnFHALTjITBQZrCrgGJ5nRHBguFXAPTjKzElhQBYYEJ5nhMbCUFhgWnGSmNWCRBb7wOnNuHpxkxq1A1CU4kQGWAkG34ESGWALEXIMTGWQJENve3nxQJoc/6cS5HsFJFmIpELvX4e/vy4ZA0LWADNECRN0KyACtQNilgDTvAcTNC0jjXsDAtIA07QlMzApIw97AyKSANLMAZt0LSCMrYNi1gDSxBKbdCkgDa2DcpYAU9wDmzQWksBcI0FRAinoSg6WhEqYF1vU/IyQEmyvA7wOHwClSbAQIUyogkUKjQKCTCkiRkSBUdQEpMBoEY4G5vwwekMtrAOEegjdp2ClycQ0g3BPwCLwA4t3mevcX4v15BPMxUI0AAAAASUVORK5CYII=')",
    "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAABTCAYAAAAPx14WAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAAC7klEQVRoQ+WbMYvUQBTHVzhQELGT7WztDj/BfoEDLbTVytpvJIh2FhZ+kCuEOzg4Wz+ChUV8v+UlJJs3yUwyO/OCxY/ZzLyZ/f13J+FCbne/br8eDJ4JT5um2XkG+cbgg/DEmuCJkDx8FC4Ft9/AlHzLK8FlgBh5cBkgVh7cBUDeutq8F9wHOJU/nqAKoq4DDLbN3c/PnZziOsBoz28pgHnCbiWAKQ9bCBCUB+8BJuXBc4BZefAaIEoePAaIlgdvAZLkwVOAZHnwEmCRPHgIsFgeagdYJQ81A6yWBw1wyYLSEqDI/UB2eZDXB+0bcH/zhfZ5X2ANWbcNC9IK/j/5gDjHo1ohqzgslq8tDovkc4rL2N7qjyFZPrP4G+EPrTU+R5L8GcT/ai1tcoBo+TOKtyQHiJIvIN6SFGBWvqB4S3SASfkK4i1RAYLyBcV/G30wG8CULyj+TXikrTU+GWAkX1j8Qusu9NiqCwYYyNcQ79UnB+jka4r35iUFOMp7EG9hXOus+YMAu0Rx/k4/m3gLdVpvrdMFoPCt0N3d8FrveAZoyENbd4qMXQkh8R9ClHgL9TrPWo/3ucr2yUv/XrjVulO4lr+w5oWgXudZ6/E+e4qy7XnpzxKAOq231jmKU3eUBy8BGNc6a34nDp081A5Av45b8wbiMJCHWgE41n6rfiQOI3koHYBWj606UxxMeSgY4LW21nhQHILyUChAiElxmJSHSgFmxWFWHgoHiBKHKHkoFCBaHKLl4cwBksQhSR7OFCBZHJLlIXOA77TW+ByL5CFXgDUslofaAVbJQ80Aq+VBA/SfSRFg9Gjn5vrToG4t/7f8ZrfNZk/Y2uKwSN6DOCTLexGHJHlP4hAt700couQ9isOsvFdxmJT3LA5Bee/iYMpvQRxG8lsRh4H8lsQBwdFvRhigFdyKw6l8nyL/J7aGwbaJwI04pMi7EodYeXfiECM/+ey1JnPy74QH1kQPIG9daeCl8FB4bE2sT7P7B7MoeQSdPNB2AAAAAElFTkSuQmCC')",
  ].join(', '),
  textAlign: 'center',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  padding: '0 1.4em',
  letterSpacing: '-0.5px',
  cursor: 'pointer',
  color: 'var(--black)',
  height: '30px',
  display: 'inline-block',
  position: 'relative',
  minWidth: '150px',
  maxWidth: '200px',
  width: '100%',

  ':disabled': {
    filter: 'grayscale(1)',
    cursor: 'default',
  },

  '@media (max-width: 400px)': {
    minWidth: 0,
  },
}

const content = ({ isDisabled }) => ({
  backgroundImage:
    "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAABTCAYAAABapr1IAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAApSURBVHjaYrh3fYk9DDPcu77kPwyTy0ExjbpGj3JGOaOcAcyAcNMAAwCTVTNGPFD01wAAAABJRU5ErkJggg==')",
  backgroundRepeat: 'repeat-x',
  backgroundSize: '3px 100%',
  display: 'inline-block',
  lineHeight: '30px',
  height: '100%',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',

  '::before': {
    content: isDisabled ? undefined : '""',
    width: '100%',
    paddingTop: '100%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(0%, -75%) rotate(45deg)',
    backgroundImage: 'linear-gradient(45deg, #ffffff66, #ffffff33)',
    transition: '0.25s',
  },

  ':hover::before': { transform: 'translate(-50%, -50%) rotate(45deg)' },
})

const styles = { cta, content }

export default styles
