// ===== mobile nav =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('is-open');
  mobileNav.classList.toggle('is-open');
});
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('is-open');
    mobileNav.classList.remove('is-open');
  });
});

const slider = document.querySelector('.voice-scroll');
  
  let isDown = false;
  let startX;
  let scrollLeft;

  // マウスをクリックした時
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active'); // ドラッグ中のクラスを追加
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  // マウスが要素の外に出た時
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  // マウスクリックを離した時
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  // マウスを動かしている時（ドラッグ中）
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return; // クリックしていなければ処理しない
    e.preventDefault(); // テキスト選択などを防ぐ
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // スクロール速度（2倍にしています）
    slider.scrollLeft = scrollLeft - walk;
  });

// ===== FAQ accordion =====
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item.is-open').forEach(other => {
      if (other !== item) {
        other.classList.remove('is-open');
        other.querySelector('.faq-a').style.maxHeight = null;
      }
    });
    if (isOpen) {
      item.classList.remove('is-open');
      a.style.maxHeight = null;
    } else {
      item.classList.add('is-open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// ===== campus tabs (visual state only — same schedule shown for all in this demo) =====
document.querySelectorAll('.campus-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.campus-tab').forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');
  });
});

// ===== schedule type toggle (無料体験 / 講座) =====
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
  });
});

// ===== form submit (demo — no backend) =====
const form = document.getElementById('applyForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formMsg.hidden = false;
  formMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  form.reset();
});

// --- BeEnとは？セクションのアコーディオン機能 ＆ 画像切り替え ---

const accTitles = document.querySelectorAll('.acc-title');
const accItems = document.querySelectorAll('.acc-item');   // ← 追加：項目一覧をまとめて取得
const aboutImg = document.getElementById('aboutImg');

const AUTO_ROTATE_MS = 8000; // 自動で切り替わる間隔（ミリ秒）。
document.documentElement.style.setProperty('--rotate-ms', AUTO_ROTATE_MS + 'ms');
let rotateTimer = null;      // setIntervalのIDを覚えておくための箱

// クリック時と自動切り替え時、両方から呼び出す共通の「開く」処理
function openAccordionItem(itemToOpen) {
  if (itemToOpen.classList.contains('is-active')) return;

  accItems.forEach(item => {
    item.classList.remove('is-active');
    item.querySelector('.acc-content').style.maxHeight = null; // 閉じる項目は高さを0に戻す

    const fill = item.querySelector('.acc-bar-fill');
    fill.style.animation = '';  // 'none'指定を解除して、CSSのanimationルールに戻す
    fill.style.height = '';     // 100%固定を解除して、CSSのheight:0%に戻す
  });

  itemToOpen.classList.add('is-active');
  const content = itemToOpen.querySelector('.acc-content');
  content.style.maxHeight = content.scrollHeight + 'px'; // 開く項目は実際の高さをセット

  const newImageSrc = itemToOpen.getAttribute('data-image');
  aboutImg.style.opacity = 0;
  setTimeout(() => {
    aboutImg.src = newImageSrc;
    aboutImg.style.opacity = 1;
  }, 300);
}
// 「次の項目」を開く（末尾まで行ったら最初に戻る）
function openNextItem() {
  const items = Array.from(accItems);
  const currentIndex = items.findIndex(item => item.classList.contains('is-active'));
  const nextIndex = (currentIndex + 1) % items.length; // %は「割り算のあまり」＝末尾の次を0に戻す計算
  openAccordionItem(items[nextIndex]);
}

// 自動ローテーションを（再）スタートする
function startAutoRotate() {
  clearInterval(rotateTimer); // 既に動いているタイマーがあれば一旦止める（二重に動くのを防ぐ）
  rotateTimer = setInterval(openNextItem, AUTO_ROTATE_MS);
}

// クリックされたときの処理
accTitles.forEach(title => {
  title.addEventListener('click', () => {
    const clickedItem = title.parentElement;
    openAccordionItem(title.parentElement);
    clearInterval(rotateTimer); 

    // クリックされた項目のバーだけ、アニメーションを解除して即座に満タン(100%)にする
    const fill = clickedItem.querySelector('.acc-bar-fill');
    fill.style.animation = 'none'; // CSS側のanimationを一旦無効化
    fill.style.height = '100%';    // 高さを直接100%に固定する
  });
});

// ページを開いたら自動ローテーションを開始
startAutoRotate();
const initialItem = document.querySelector('.acc-item.is-active');
if (initialItem) {
  const initialContent = initialItem.querySelector('.acc-content');
  initialContent.style.maxHeight = initialContent.scrollHeight + 'px';
}