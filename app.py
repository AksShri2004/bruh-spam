from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
import os

app = Flask(__name__)
CORS(app)

# Load your trained model and vectorizer (update paths accordingly)
model = pickle.load(open('spam_model.pkl', 'rb'))
tfidf = pickle.load(open('tfidf_vectorizer.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict_spam():
    data = request.get_json(force=True)
    email_text = data.get('email_text', '')

    # Transform text to feature vector
    email_vec = tfidf.transform([email_text])

    # Predict spam or not spam
    prediction = model.predict(email_vec)[0]

    # Convert numeric prediction to label
    label = 'spam' if prediction == 1 else 'not spam'

    return jsonify({'prediction': label})

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)

