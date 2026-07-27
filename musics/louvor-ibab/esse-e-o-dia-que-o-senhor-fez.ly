\version "2.22.2"

#(set-default-paper-size "a5")

\header {
title = "Esse é o dia que o Senhor fez"
composer = "Louvor IBAB"
copyright = "Como tocado em https://youtu.be/ZLbnBZBkyj8&list=RDZLbnBZBkyj8"
}


md = \mark \default
empty = \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c'' {

 % Intro
 \mark "Intro"
 \repeat volta 3 {
   \improvisationOn
     r8^"EPiano" b4 b2~8
     r8 b4 b2~8^"(3x)"
   \improvisationOff
 }
 bes4.^"(w/ Brightness)" a f4~1

 % A
 \break \md
 \improvisationOn
   \repeat volta 3 {   
       r8 b4 b2~8
   } \alternative {
     {r8 b4 b2~8}
     {r8 b4 b2~8}
   }
   bes4. b b4~
   \hide Stem
     b4 b b b
   \undo \hide Stem

   \break
   \repeat volta 3 {   
       r8 b4 b2~8
   } \alternative {
     {r8 b4 b2~8}
     {r8 b4 b2~8}
   }
   bes4. b b4~
   \hide Stem
     b4 b b b
   \undo \hide Stem

 \improvisationOff

 % B
 \break \md
 \improvisationOn
   \repeat volta 3 {   
       r8 b4 b2~8
   } \alternative {
     {r8 b4 b2~8}
     {r8 b4 b2~8}
   }
   \repeat percent 2 {
     bes4. b b4~
     \hide Stem
       b4 b b b
     \undo \hide Stem
   }
 \improvisationOff

 % C, D
 \break \md
 \time 6/4
 r2 r8 c bes^"(w/ Brightness)" a g f fes ees
 \md
 \time 4/4
 \improvisationOn
   \repeat volta 3 {   
       r8 b'4 b2~8
   } \alternative {
     {r8 b4 b2~8}
     {r8 b4 b2~8}
   }
   \repeat unfold 2 {
     bes4. b b4~
     \hide Stem
       b4 b b b
     \undo \hide Stem
   }
 \improvisationOff

 % E (B)
 \break \md
 \improvisationOn
   \repeat volta 3 {   
       r8 b4 b2~8
   } \alternative {
     {r8 b4 b2~8}
     {r8 b4 b2~8}
   }
   \repeat percent 2 {
     bes4. b b4~
     \hide Stem
       b4 b b b
     \undo \hide Stem
   }
 \improvisationOff

 % F
 \break \md
 \improvisationOn
   \repeat volta 2 {
     \repeat percent 4
       \repeat unfold 4
         b4\staccato
   }
 \improvisationOff
 \break
 \repeat volta 5 {
   \empty \empty
 } \alternative {
   {\empty \empty}
   {\empty \empty}
   {\empty \empty}
   {\empty \empty}
   {
     \improvisationOn
       r4 b r b r b b b
     \improvisationOff
   }
 }

 % G
 \break \md
 \improvisationOn
   \repeat percent 2 {
     \repeat percent 2 {
       b4. b8~2
     }
   }
 \improvisationOff
 \empty
 \improvisationOn b4 4 4 4 \improvisationOff
 \empty \empty

 % H (B)
 \break \md
 \improvisationOn
   \repeat volta 3 {   
       r8 b4 b2~8
   } \alternative {
     {r8 b4 b2~8}
     {r8 b4 b2~8}
   }
   \repeat percent 2 {
     bes4. b b4~
     \hide Stem
       b4 b b b
     \undo \hide Stem
   }
 \improvisationOff

 % J
 \break \md
 \improvisationOn
   b4. b
 \improvisationOff
 r8 d8~8^"(w/ Brightness)" c4 g f a8~
 a1:16\fermata \bar "|."


}

harmony = \chordmode {
 % Intro
 \repeat volta 3 {
   f4./a bes8~2 c4. d8:m7~2
 }
 f4.:sus4/ees f/ees ees4/g~1

 % A
 \repeat volta 3 {
   f4./a bes8~2
 } \alternative {
   {c4. d8:m7~2}
   {cis4.:dim d8:m7~2}
 }
 f4.:sus4/ees f/ees ees4/g~1

 \repeat volta 3 {
   f4./a bes8~2
 } \alternative {
   {c4. d8:m7~2}
   {cis4.:dim d8:m7~2}
 }
 ees4./g f ees4~1

 % B
 \repeat volta 3 {
   f4./a bes8~2
 } \alternative {
   {c4. d8:m7~2}
   {cis4.:dim d8:m7~2}
 }
 \repeat percent 2 {
   bes4./f f ees4/f~1
 }

 % C, D
 r1.
 \repeat volta 3 {
   f4./a bes8~2
 } \alternative {
   {c4. d8:m7~2}
   {cis4.:dim d8:m7~2}
 }
 bes4./f f ees4/f~1 bes4./f f ees4~1

 % E (B)
 \repeat volta 3 {
   f4./a bes8~2
 } \alternative {
   {c4. d8:m7~2}
   {cis4.:dim d8:m7~2}
 }
 \repeat percent 2 {
   bes4./f f ees4/f~1
 }

 % F
 \repeat volta 2 {
   bes1:maj7 a:aug7 d:m7 c2:m7 f:7
 }
 \repeat volta 5 {
   bes1:maj7 a:aug7
 } \alternative {
   {g2:m7 f/a bes1/c}
   {d1:m7 c2:m7 f:7}
   {g2:m7 f/a c:m7 f:7}
   {d:m7 g:7 c:m7 f:7}
   {g:m7 f/a bes1/c}
 }

 % G
 \repeat percent 2 {
   f4./a bes8~2 c4. d8:m7~2
 }
 f4./a bes8~2 f4/a cis:dim d:m7 c bes2:maj77 f/a ees1:maj7

 % H (B)
 \repeat volta 3 {
   f4./a bes8~2
 } \alternative {
   {c4. d8:m7~2}
   {cis4.:dim d8:m7~2}
 }
 \repeat percent 2 {
   bes4./f f ees4/f~1
 }

 % J
 bes4./f f r4 r2.. b8:maj7~1

}

\score {
<<
  \new ChordNames {
    \set chordChanges = ##t
    \harmony
  }
  \new Staff {
    \key f \major
    \melody
  }
>>

}