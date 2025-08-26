
        // Assessment Logic
        let currentQuestion = 1;
        let answers = {};
        let totalQuestions = 5;

        // Lens definitions with scoring patterns
        const lensData = {
            'emotional-xray': {
                title: 'EMOTIONAL X-RAY',
                nickname: 'The Signal Catcher',
                description: `You're the one who hears what isn't said. You pick up shifts in tone like static in a song: the false notes, the power games, the egos hiding behind buzzwords. Your gratitude may fill a room, but so does your discernment. It's a gift. And a weight.

This lens sharpens your perception, but it can also make the room feel noisy when you're the only one truly listening.`,
                personalTouch: `Your ⚡ represents those moments when you feel the room's tension before anyone speaks. This lens sharpens in crowded spaces and family dinners.`,
                thinkBlink: `Power doesn't always wear a suit. Sometimes it wears silence and lets the room speak first. Your clarity can be costly, but it's priceless when you claim the whole table, not just the seat they offer.`,
                triggers: ['emotional-other', 'care-others', 'observe-dynamics']
            },
            'snap-focus': {
                title: 'SNAP FOCUS',
                nickname: 'The Threat Detector',
                description: `Your first thought is the worst-case one. You react quickly, often before the moment unfolds. You confuse urgency with importance. You're often exhausted - not from events, but from bracing for them. You've rarely said, "Let's wait and see."

This lens sharpens one thing: threat. Everything else blurs behind it.`,
                personalTouch: `Your ⚡ represents the threat your mind rehearses most often. This lens clicks into place the moment uncertainty enters the room.`,
                thinkBlink: `Hypervigilance isn't insight. It's survival rehearsing failure. The feeling is speed. You don't have to match it.`,
                triggers: ['anticipate-threat', 'urgent-cataloguing', 'absence-worry']
            },
            'mirror-fog': {
                title: 'MIRROR FOG',
                nickname: 'The Self-Doubter',
                description: `You don't trust what you know - especially if no one else agrees with it. You talk yourself out of things you once felt certain about. You soften your statements even in your own mind. You assume your perception is flawed if someone questions it.

This lens clouds not the facts but your confidence in seeing them.`,
                personalTouch: `Your ⚡ represents moments when you second-guessed your truth because it met resistance. This lens fogs when you need validation most.`,
                thinkBlink: `That wasn't need. That was clarity you weren't allowed to trust. What if this is true and you simply saw it first?`,
                triggers: ['self-blame', 'disappointed-unsurprised', 'clarity-self']
            },
            'identity-blur': {
                title: 'IDENTITY BLUR',
                nickname: 'The Social Chameleon',
                description: `You're whoever the room needs you to be - polished, pleasant, perceptive. You match moods like a mirror and morph expectations like a shapeshifter. You sometimes catch yourself thinking: "Who am I really - without an audience?"

This lens doesn't obscure you. It duplicates you - until the original goes missing.`,
                personalTouch: `Your ⚡ represents who you are when no one's watching. This lens blurs when you've adapted so well you forget your own face.`,
                thinkBlink: `When everyone gets a version of you... who gets the full one? Your identity isn't a costume. It's a compass.`,
                triggers: ['adapt-room', 'missing-script', 'not-performing']
            },
            'self-subtraction': {
                title: 'SELF-SUBTRACTION',
                nickname: 'The Disappearing Act',
                description: `You shrink in conversations to keep things comfortable. You pre-emptively say "it's fine" - even when it isn't. You hold your tongue so tightly you forget how your voice sounds. You don't ask for help because you don't want to be "too much."

This lens doesn't break you. It erases you in slow, socially acceptable strokes.`,
                personalTouch: `Your ⚡ represents a time you made yourself smaller so others could feel bigger. This lens fogs when your needs compete with keeping peace.`,
                thinkBlink: `That's not humility. That's self-abandonment dressed as good manners. My presence doesn't require permission. Just practice.`,
                triggers: ['apologetic-alone', 'should-stayed-home', 'retreat-think']
            },
            'meaning-mismatch': {
                title: 'MEANING MISMATCH',
                nickname: 'The Successful Stranger',
                description: `You've ticked the boxes, reached the milestones, filled the calendar. You post the pictures. Smile at the right times. Say you're grateful - and mean it. But something underneath keeps whispering: "Is this it?"

This lens doesn't create emptiness. It just hides the fact you're living someone else's idea of full.`,
                personalTouch: `Your ⚡ represents the gap between what looks right and what feels real. This lens shimmers when your outer success can't fill your inner question mark.`,
                thinkBlink: `That wasn't ingratitude. That was your soul noticing the story doesn't fit anymore. Meaning isn't found in fullness. It's found in resonance.`,
                triggers: ['inner-outer-align', 'help-solve', 'someone-sees']
            }
        };

        function updateProgress() {
            const progress = (currentQuestion - 1) / totalQuestions * 100;
            document.getElementById('progressFill').style.width = progress + '%';
        }

        function changeQuestion(direction) {
            // Hide current question
            document.querySelector(`.question-container[data-question="${currentQuestion}"]`).classList.remove('active');
            
            currentQuestion += direction;
            
            // Show new question or results
            if (currentQuestion > totalQuestions) {
                showResults();
                return;
            }
            
            document.querySelector(`.question-container[data-question="${currentQuestion}"]`).classList.add('active');
            
            // Update buttons
            document.getElementById('prevBtn').disabled = currentQuestion === 1;
            document.getElementById('nextBtn').disabled = !answers[currentQuestion];
            
            updateProgress();
        }

        // Add click handlers to options
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.option').forEach(option => {
                option.addEventListener('click', function() {
                    const questionNum = this.closest('.question-container').dataset.question;
                    
                    // Clear previous selection
                    this.closest('.options').querySelectorAll('.option').forEach(opt => 
                        opt.classList.remove('selected'));
                    
                    // Select this option
                    this.classList.add('selected');
                    
                    // Store answer
                    answers[questionNum] = this.dataset.value;
                    
                    // Enable next button
                    document.getElementById('nextBtn').disabled = false;
                    
                    // Auto-advance after short delay
                    setTimeout(() => {
                        if (currentQuestion <= totalQuestions) {
                            changeQuestion(1);
                        }
                    }, 800);
                });
            });
        });

        function calculateLens() {
            const answerValues = Object.values(answers);
            const lensScores = {};

            // Score each lens based on trigger matches
            Object.keys(lensData).forEach(lens => {
                lensScores[lens] = 0;
                answerValues.forEach(answer => {
                    if (lensData[lens].triggers.includes(answer)) {
                        lensScores[lens]++;
                    }
                });
            });

            // Find the lens with highest score
            let topLens = 'emotional-xray'; // default
            let maxScore = 0;
            
            Object.keys(lensScores).forEach(lens => {
                if (lensScores[lens] > maxScore) {
                    maxScore = lensScores[lens];
                    topLens = lens;
                }
            });

            return topLens;
        }

        function showResults() {
            document.getElementById('assessmentContainer').style.display = 'none';
            document.getElementById('resultsContainer').style.display = 'block';
            
            const lens = calculateLens();
            const lensInfo = lensData[lens];
            
            document.getElementById('lensCard').innerHTML = `
                <div class="lens-title">YOUR LENS: ${lensInfo.title}</div>
                <div class="lens-nickname">Nickname: ${lensInfo.nickname}</div>
                
                <div class="lens-description">${lensInfo.description}</div>
                
                <div class="personal-touch">${lensInfo.personalTouch}</div>
                
                <div class="think-blink">
                    <strong>A Think Blink™ to keep:</strong><br>
                    ${lensInfo.thinkBlink}
                </div>
                
                <div class="disclaimer">
                    This is an estimated lens based on symptoms. The real discovery is yours.<br>
                    <strong>Try Lens Cabinet / Think the Unblinkable™ for full 40-lens clarity.</strong>
                </div>
                
                <div class="lens-grid">
                    <div class="lens-grid-item">Mirror Fog</div>
                    <div class="lens-grid-item">Snap Focus</div>
                    <div class="lens-grid-item">Echo Lens</div>
                    <div class="lens-grid-item">Ghost Gaze</div>
                    <div class="lens-grid-item">Praise Prism</div>
                    <div class="lens-grid-item">Should Shimmer</div>
                    <div class="lens-grid-item">Grief Halo</div>
                    <div class="lens-grid-item">Radar Frame</div>
                    <div class="lens-grid-item">Kindness Confusion</div>
                    <div class="lens-grid-item">Meaning Mismatch</div>
                    <div class="lens-grid-item">Sacred Reframing</div>
                    <div class="lens-grid-item">+ 29 more...</div>
                </div>
                
                <div style="margin-top: 30px; font-size: 0.9rem; color: #c4c4c4;">
                    From the OptomerTrust Assessment
                </div>
            `;
        }

        function submitEmail() {
            const emailInput = document.getElementById('emailInput');
            const messageEl = document.getElementById('emailMessage');
            const email = emailInput.value.trim();
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

            // reset message state
            messageEl.className = 'email-message';

            if (emailRegex.test(email)) {
                fetch('https://example.com/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                }).catch(() => {});

                messageEl.textContent = `Thank you! Your full lens profile will be sent to ${email}.`;
                messageEl.classList.add('success');
            } else {
                messageEl.textContent = 'Please enter a valid email address.';
                messageEl.classList.add('error');
                emailInput.focus();
            }
        }

        // Initialize
        updateProgress();
    
