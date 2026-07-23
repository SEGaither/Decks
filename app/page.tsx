import Image from "next/image";
import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { QuoteRequestFlow } from "@/components/QuoteRequestFlow";

export default function Home() {
  return (
    <>
      {/* 1. Header */}
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="logo" aria-label="Daychanger Decks — home">
            <svg
              viewBox="0 0 40 40"
              width={30}
              height={30}
              aria-hidden="true"
              focusable="false"
              className="logo-mark"
            >
              <circle cx="20" cy="20" r="19" fill="#c49a3c" />
              <rect x="9" y="13.5" width="22" height="3.5" rx="1" fill="#1a3a1a" />
              <rect x="9" y="18.5" width="22" height="3.5" rx="1" fill="#1a3a1a" />
              <rect x="9" y="23.5" width="22" height="3.5" rx="1" fill="#1a3a1a" />
            </svg>
            <span className="logo-name">Daychanger Decks</span>
          </Link>
        </div>
      </header>

      <main>
        {/* 2. Hero */}
        <section
          id="hero"
          className="page-section section-hero"
          aria-labelledby="hero-heading"
        >
          <div className="hero-text">
            <h1 id="hero-heading">STEP OUT—NOT DOWN</h1>
            <p className="hero-description">
              Shane Gaither builds small walk-out decks that replace the
              awkward step-down from your back door to a concrete patio —
              creating a level, useful space right outside your door.
            </p>
            <CTAButton className="cta-primary">
              Request Quote
            </CTAButton>
            <p className="cta-reassurance">
              Takes about one minute to request. No pressure.
            </p>
            <p className="hero-service-area">
              Serving Albertville, Guntersville, and Boaz, Alabama
            </p>
          </div>

          {/* Before / After photos */}
          <div className="before-after-container">
            <div className="ba-photo">
              <Image
                src="/deck-before.jpg"
                alt="The back of a brick ranch house with concrete steps and an overgrown patio — before a walk-out deck was added"
                fill
                style={{ objectFit: "cover", objectPosition: "center center" }}
                sizes="(max-width: 479px) calc(100vw - 2.5rem), (max-width: 899px) calc(50vw - 1.75rem), 440px"
                priority
              />
              <span className="ba-label ba-label--before" aria-hidden="true">
                Before
              </span>
            </div>
            <div className="ba-photo">
              <Image
                src="/deck-after.jpg"
                alt="The same brick ranch house after a new light wood walk-out deck was built at the back door"
                fill
                style={{ objectFit: "cover", objectPosition: "center 40%" }}
                sizes="(max-width: 479px) calc(100vw - 2.5rem), (max-width: 899px) calc(50vw - 1.75rem), 440px"
                priority
              />
              <span className="ba-label ba-label--after" aria-hidden="true">
                After
              </span>
            </div>
          </div>
        </section>

        {/* 3. Exact Problem and Solution */}
        <section
          id="the-problem"
          className="page-section section-alt"
          aria-labelledby="problem-heading"
        >
          <div className="section-inner">
            <h2 id="problem-heading">The Back-Door Step Problem</h2>
            <p>
              Many ranch-style homes built from the 1960s through the 1980s
              have a back door that opens to one or two steps down — and below
              those steps, a concrete patio. The transition is narrow and
              awkward. There is no useful space right outside the door.
            </p>
            <h3>What a small walk-out deck changes</h3>
            <ul>
              <li>Creates a level surface right at the back door</li>
              <li>Makes coming in and out easier</li>
              <li>Gives you a practical space for sitting, grilling, or relaxing</li>
              <li>Connects the back door to the existing patio more naturally</li>
            </ul>
          </div>
        </section>

        {/* 4. Small Jobs Welcome */}
        <section
          id="small-jobs"
          className="page-section"
          aria-labelledby="small-jobs-heading"
        >
          <div className="section-inner">
            <h2 id="small-jobs-heading">Small Deck Projects Are Our Specialty</h2>
            <p>
              Daychanger Decks focuses on practical small-deck projects. These
              are exactly the jobs we take on, and we take them seriously.
            </p>
            <p>
              Some larger contractors focus on bigger jobs. Daychanger Decks is
              set up for the smaller, simpler projects that make a real
              difference for homeowners.
            </p>
          </div>
        </section>

        {/* 5. Simple Three-Step Process */}
        <section
          id="how-it-works"
          className="page-section section-alt"
          aria-labelledby="process-heading"
        >
          <div className="section-inner">
            <h2 id="process-heading">How It Works</h2>
            <ol className="process-steps">
              <li>Request a quote online.</li>
              <li>Shane calls or comes by no later than the following day.</li>
              <li>
                Shane looks at the space and gives you a clear flat-price
                proposal.
              </li>
            </ol>
          </div>
        </section>

        {/* 6. Free Quote and Pricing Clarity */}
        <section
          id="quote-pricing"
          className="page-section"
          aria-labelledby="pricing-heading"
        >
          <div className="section-inner">
            <h2 id="pricing-heading">Free On-Site Quote</h2>
            <p>
              The quote is free. Shane comes out, evaluates the space, and
              gives you a clear flat-price proposal. You know what the project
              will cost before any work begins.
            </p>
          </div>
        </section>

        {/* 7. Owner-Operated Personal Note */}
        <section
          id="from-shane"
          className="page-section section-alt"
          aria-labelledby="shane-note-heading"
        >
          <div className="section-inner">
            <h2 id="shane-note-heading">From Shane</h2>
            <blockquote>
              <p>
                I handle these projects myself. When I come out, I look at the
                space, talk through what might work, and give you a
                straightforward recommendation. Then I give you a price —
                before any work starts. If the project makes sense, we go from
                there. If it doesn&rsquo;t, I&rsquo;ll say so.
              </p>
              <p className="blockquote-attribution">
                — Shane Gaither, Daychanger Decks
              </p>
            </blockquote>
          </div>
        </section>

        {/* 8. Service Area */}
        <section
          id="service-area"
          className="page-section"
          aria-labelledby="area-heading"
        >
          <div className="section-inner">
            <h2 id="area-heading">Where We Work</h2>
            <p>
              Daychanger Decks currently focuses on small-deck projects in
              these communities:
            </p>
            <ul className="service-area-list">
              <li>Albertville, Alabama</li>
              <li>Guntersville, Alabama</li>
              <li>Boaz, Alabama</li>
            </ul>
          </div>
        </section>

        {/* 9. Quote-Request */}
        <section
          id="quote-request"
          className="page-section section-dark"
          aria-labelledby="quote-heading"
        >
          <div className="section-inner">
            <h2 id="quote-heading">Request a Quote</h2>
            <QuoteRequestFlow />
          </div>
        </section>

        {/* 10. Frequently Asked Questions */}
        <section
          id="faq"
          className="page-section section-alt"
          aria-labelledby="faq-heading"
        >
          <div className="section-inner">
            <h2 id="faq-heading">Common Questions</h2>
            <dl className="faq-list">
              <div className="faq-item">
                <dt>
                  Who builds small decks in Albertville, Guntersville, and Boaz?
                </dt>
                <dd>
                  Shane Gaither of Daychanger Decks builds small walk-out and
                  floating decks in Albertville, Guntersville, and Boaz,
                  Alabama.
                </dd>
              </div>

              <div className="faq-item">
                <dt>Do you take small deck jobs?</dt>
                <dd>
                  Yes. Small deck projects are our specialty. That is exactly
                  the work Daychanger Decks focuses on.
                </dd>
              </div>

              <div className="faq-item">
                <dt>
                  Can you replace the steps outside my back door with a deck?
                </dt>
                <dd>
                  That is the kind of project we take on. Shane will need to
                  look at the space to determine what layout and approach will
                  work best.
                </dd>
              </div>

              <div className="faq-item">
                <dt>
                  Do you build decks next to or over an existing concrete patio?
                </dt>
                <dd>
                  We work in situations where an existing concrete patio is
                  present below the back door. Shane will need to inspect the
                  space before recommending a specific layout.
                </dd>
              </div>

              <div className="faq-item">
                <dt>What kind of decks do you build?</dt>
                <dd>
                  Daychanger Decks builds small, practical floating and
                  walk-out decks — primarily for the area just outside a back
                  door where a level surface would be useful.
                </dd>
              </div>

              <div className="faq-item">
                <dt>Is the on-site quote free?</dt>
                <dd>
                  Yes. The quote is free. Shane comes out, looks at the space,
                  and gives you a clear flat-price proposal before any work
                  begins.
                </dd>
              </div>

              <div className="faq-item">
                <dt>How does the quote process work?</dt>
                <dd>
                  You request a quote. Shane calls or comes by no later than
                  the following day. He looks at the space and gives you a
                  clear flat-price proposal. You decide whether to move
                  forward.
                </dd>
              </div>

              <div className="faq-item">
                <dt>When will Shane contact me?</dt>
                <dd>
                  Shane will call or come by no later than the following day
                  after you submit a quote request.
                </dd>
              </div>

              <div className="faq-item">
                <dt>Why do you ask for my project address?</dt>
                <dd>
                  The address helps Shane identify where the project is and
                  whether it falls within the service area. Your information is
                  used only to respond to your quote request.
                </dd>
              </div>

              <div className="faq-item">
                <dt>How do I request a quote?</dt>
                <dd>
                  Click Request Quote and provide your name, phone number, and
                  project address. Shane will call or come by no later than the
                  following day.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* 11. Final Quote Request */}
        <section
          id="get-started"
          className="page-section section-dark section-final-cta"
          aria-labelledby="final-cta-heading"
        >
          <div className="section-inner">
            <h2 id="final-cta-heading">Ready for a Level Walk-Out Deck?</h2>
            <p>
              Daychanger Decks builds small, practical decks for back-door and
              concrete-patio situations in Albertville, Guntersville, and Boaz,
              Alabama.
            </p>
            <CTAButton className="cta-primary">
              Request Quote
            </CTAButton>
            <p>Shane will call or come by no later than the following day.</p>
          </div>
        </section>
      </main>

      {/* 12. Footer */}
      <footer className="site-footer">
        <p>Daychanger Decks — Shane Gaither</p>
        <p>Albertville &middot; Guntersville &middot; Boaz, Alabama</p>
        <div className="footer-rule" aria-hidden="true"></div>
        <p>
          <small>
            Contact information provided through this site is used only to
            respond to your quote request.
          </small>
        </p>
      </footer>
    </>
  );
}
