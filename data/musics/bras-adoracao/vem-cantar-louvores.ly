\version "2.25.35"

#(set-default-paper-size "a5")

\header {
  title = "Vem cantar louvores"
  composer = "Brás Adoração"
  copyright = "Como tocado em https://youtu.be/h4YWqwLlBv4"
}


md = \mark \default
empty = \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
groove = {\improvisationOn \hide Stem  b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c'' {
  \key g \major

  \partial 2 r2
  \mark "Intro"
  \repeat volta 2 {\repeat unfold 3 \groove}
  \alternative {
    \volta 1 {\empty}
    \volta 2 {
      \improvisationOn \hide Stem b4 4 \undo \hide Stem 4 4 1 \improvisationOff
    }
  } \break

  \md %A
  \repeat volta 2 {
    \empty \empty \improvisationOn \hide Stem b4 4 4 \undo \hide Stem 4\improvisationOff 
    \empty\empty \empty
  } \alternative {
    \volta 1 {\empty \improvisationOn \hide Stem b4 4 \undo \hide Stem 4 4\improvisationOff}
    \volta 2 {\empty \improvisationOn \hide Stem b4 \undo \hide Stem \improvisationOff r8 g16 fis e8 g fis d}
  } \break

  \md %B
  \volta 2 {
    \improvisationOn
      b'4. b16 16 b4 \hide Stem 4 4 \undo \hide Stem 
    \improvisationOff
    r8 c16 d e8 d c b

    \improvisationOn
      b4. b16 16 b4 \hide Stem 4 4 \undo \hide Stem 
    \improvisationOff
    r8 d16 e fis8 e d c

    \improvisationOn
      b4. b16 16 b4 \hide Stem 4 4 4 \undo \hide Stem 
      b8. 16~8 8
    \improvisationOff
    \empty
  } \alternative {
    \volta 1 {\improvisationOn \hide Stem b4 \undo \hide Stem \improvisationOff r8 g16 fis e8 g fis d}
    \volta 2 {\empty \empty}
  } \break

  \md %C
  \repeat volta 2 {
    \improvisationOn b'4\staccato r2 b4\improvisationOff 
    \empty \improvisationOn \hide Stem b4 4 4 \undo \hide Stem 4\improvisationOff 
    \empty\empty 
  } \alternative {
    \volta 1 {\empty \empty \improvisationOn \hide Stem b4 4 \undo \hide Stem 4 4\improvisationOff}
    \volta 2 {
      \improvisationOn b2 2 1 \improvisationOff
      \empty
      \improvisationOn
        \hide Stem b4 4 4 \undo \hide Stem \tuplet 3/2 {b8 8 8}
        \bar "||"
        \key aes \major
        \hide Stem b4 4 \undo \hide Stem 4 4
      \improvisationOff
    }
  } \break

  \md %D
  \repeat volta 2 {
    \improvisationOn
      b4. b16 16 b4 \hide Stem 4 4 \undo \hide Stem 
    \improvisationOff
    r8 des16 ees f8 ees des c

    \improvisationOn
      b4. b16 16 b4 \hide Stem 4 4 \undo \hide Stem 
    \improvisationOff
    r8 ees16 f g8 f ees des

    \improvisationOn
      b4. b16 16 b4 
      \hide Stem 4 4 4 \undo \hide Stem  b8. 16~8 8
    \improvisationOff
  } \alternative {
    \volta 1 {
      \empty
      \improvisationOn \hide Stem b4 \undo \hide Stem \improvisationOff r8 aes16 g f8 aes g ees

      \improvisationOn b'4\staccato \improvisationOff 
      r2. r4. des16 ees f8 ees des c
      \improvisationOn b4\staccato \improvisationOff 
      r2. r4. ees16 f g8 f ees des

      \improvisationOn
        b4. b16 16 b4 \hide Stem r4 4 4 \undo \hide Stem 
        b8. 16~8 8
      \improvisationOff
      \empty
      \improvisationOn \hide Stem b4 \undo \hide Stem \improvisationOff r8 aes16 g f8 aes g ees
    }
    \volta 2 {
      \repeat percent 2 {
        \empty
        \improvisationOn
          \hide Stem 4 4 \undo \hide Stem  b'8. 16~8 8
        \improvisationOff
      }
    }
  }
  \break

  \md
  \bar "||"
  \empty \improvisationOn b2 r2 b4\improvisationOff
  aes16^"rit." bes c ees f8. ees16 r8 des c1\fermata
}

harmony = \chordmode {
  % Intro
  r2
  \repeat volta 2 {c4.:9 c8~2 c4./g g8~2 d4.:sus4 d8~2}
  \alternative {
    \volta 1 {c1} 
    \volta 2 {c2 c4/e d g1}
  }

  %A
  \repeat volta 2 {g1~1~2. e4:m7 d1 a1:m7~1}
  \alternative {
    \volta 1 {d1 b2:m7 a4:m7 d}
    \volta 2 {c2 d g c4:/e d/fis}
  }

  %B
  \repeat volta 2 {
    g4.. a16:m7 g2/b c1
    a4..:7 g16/g a2/cis d1
    b4..:7 a16/cis b2/dis e2:m7
    a8.:m7 g/b c8 g2/d d
  } \alternative {
    \volta 1 {g c4/e d/fis}
    \volta 2 {g1 c2/e d/fis}
  }

  %C
  \repeat volta 2 {g1~1~2. e4:m7 d1}
  \alternative {
    \volta 1 {a1:m7~1 d1 b2:m7 a4:m7 d}
    \volta 2 {a2:m7 a:m7.7+ a1:m7~1 d ees2 des4/f ees/g}
  }

  %D
  \repeat volta 2 {
    aes4.. bes16:m7 aes2/c des1
    bes4.. aes16/c bes2/d ees1
    c4.. bes16/d c2/e f2:m7 bes8.:m7 aes/c des8 
  } \alternative {
    \volta 1 {
      aes2/ees ees aes des4/f ees/g
      
      aes4 r2. r1
      bes4 r2. r1
      c4.. bes16/d c2/e f2:m7 bes8.:m7 aes/c des8 
      aes2/ees ees aes des4/f ees/g
    }
    \volta 2 {
      \repeat percent 2 {aes2/ees f:dim7 f2:m7 bes8.:m7 aes/c des8}
    }
  }

  aes1/ees ees aes2 des8. aes/c bes8:m7 aes1
  
}

\score {
  <<
    \new ChordNames {
      \set chordChanges = ##t
      \harmony
    }
    \new Staff {
      \melody
    }
  >>

}