from app import db, ma
from passlib.apps import custom_app_context as pwd_context
from marshmallow_sqlalchemy.fields import Nested
from marshmallow import fields

class User(db.Model):
    userId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    surname = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    github_username = db.Column(db.String(80))
    created_date = db.Column(db.DateTime)
    repos = db.relationship('Repo', backref='user', lazy=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def add_repo(self, repo:'Repo'):
        self.repos.append(repo)
        db.session.commit()

    def hash_password(self, password):
        self.password = password
        # self.password = pwd_context.encrypt(password)

    def verify_password(self, password):
        if self.password == password:
            return True
        else:
            return False
        # return pwd_context.verify(password, self.password)

    def commit(self):
        db.session.commit()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(userId=_id).first()


class Repo(db.Model):
    repoId = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.userId'), nullable=False)
    url = db.Column(db.Text, nullable=False)
    language = db.Column(db.String(80))
    isChecked = db.Column(db.Boolean, nullable=False, default=False)
    added_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)
    repos = db.relationship('Check', backref='repo', lazy=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(repoId=_id).first()
    

class Check(db.Model):
    checkId = db.Column(db.Integer, primary_key=True)
    repoId = db.Column(db.Integer, db.ForeignKey('repo.repoId'), nullable=False)
    check_date = db.Column(db.DateTime)
    inconsistency = db.Column(db.String(120))


class RepoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Repo
        include_fk = True
        # include_relationships = True
        load_instance = True
        exclude = ("added_date","language", "updated_date", )

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_relationships = True
        load_instance = True
        exclude = ("password","created_date", "github_username")

    repos = Nested(RepoSchema, many=True)



if __name__ == "__main__":
    print("Creating database tables...")
    db.create_all()
    print("Done!")