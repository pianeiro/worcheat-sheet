\version "2.23.2"

#(set-default-paper-size "a5")

\header {
  title = "Vem cantar louvores"
  composer = "Brás Adoração"
  copyright = "Como tocado em https://youtu.be/h4YWqwLlBv4"
}


md = \mark \default
empty = {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c'' {

  \mark "Intro"
  \repeat volta 2 {
    \repeat percent 3 \empty
  } \alternative {
    {\empty}
    {
      \improvisationOn
      b8. 8. 8 4 4 1
      \improvisationOff
    }
  } \break

  \md
  \repeat volta 2 {
    \repeat percent 2 \empty
    \improvisationOn
      \hide Stem b4 4 4 \undo \hide Stem 4
    \improvisationOff
    \empty
    \repeat percent 32\empty
  } \alternative {
    {
      \empty
      \improvisationOn
      \hide Stem b4 4 \undo \hide Stem 4 4
      \improvisationOff
    }
    {
      \empty
      \improvisationOn
      \hide Stem b4 \undo \hide Stem b8 b16 b16 b4 4
      \improvisationOff
    }
  } \break

  \md
  \repeat volta 2 {
    \improvisationOn
      \hide Stem b4. \undo \hide Stem b16 b16 2
      \hide Stem b4. \undo \hide Stem
    \improvisationOff
    c16 d  e8 d c b 
    \improvisationOn
      \hide Stem b4. \undo \hide Stem b16 b16 2
      \hide Stem b4. \undo \hide Stem
    \improvisationOff
    d16 e  fis8 e d c
    \improvisationOn
      \hide Stem b4. \undo \hide Stem b16 b16 2
      \hide Stem b4 4 \undo \hide Stem b8. b b8
    \improvisationOff
  } \alternative {
    {
      \empty
      \improvisationOn
        \hide Stem b4 \undo \hide Stem b8 b16 b16 b4 4
      \improvisationOff
    }
    {\empty \empty}
  }

  \md
  \repeat volta 2 {
    \repeat percent 2 \empty
    \improvisationOn
      \hide Stem b4 4 4 \undo \hide Stem 4
    \improvisationOff
    \empty
    \repeat percent 2 \empty
  } \alternative {
    {
      \empty
      \improvisationOn
      \hide Stem b4 4 \undo \hide Stem 4 4
      \improvisationOff
    }
    {
      \repeat percent 2 \empty
    }
  } \break

}

harmony = \chordmode {

  % Intro
  \repeat volta 2 {c1 g2:sus g d:sus d}
  \alternative {
    c1
    {c8. g/b a8:m7 c4/e d g1}
  } \break \bar "||"

  % A
  \repeat volta 2 {
    g\breve g2. e4:m7 d1
    a\breve:m7 
  } \alternative {
    {d2:sus d b:m7 a4:m7 d}
    {c2 d  g2 c4/e d/fis}
  }

  %B
  \repeat volta 2 {
  g4.. a16:m7 g2/b c1
  a4..:7 g16/b a2/cis d1
  b4..:7 a16/cis b2/dis
  e2:m7 a8.:m7 g/b c8
  } \alternative {
    {g2/d d g c4/e d/fis}
    {g1 c2/e d/fis}
  }

  % A
  \repeat volta 2 {
    g\breve g2. e4:m7 d1
    a\breve:m7
  } \alternative {
    {c2 d b:m7 a4:m7 d}
    {d1  cis/dis}
  }
}

\score {
  <<
    \new ChordNames {
      \set chordChanges = ##t
      \harmony
    }
    \new Staff {
      \key g \major
      \melody
    }
  >>

}